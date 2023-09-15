import { getAuthSession } from "@/lib/auth";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const session = await getAuthSession();

    if (!session) {
      return new NextResponse("No user found", { status: 401 });
    }

    const { content } = body;

    if (!content) {
      return new NextResponse("No content provided", {
        status: 400,
      });
    }

    const chat = await db.global.create({
      data: {
        senderId: session.user.id,
        content,
      },
    });

    return NextResponse.json(chat);
  } catch (error) {
    console.log(error);
    return new NextResponse("Something went wrong", {
      status: 500,
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);

    const take = url.searchParams.get("take");
    const lastCursor = url.searchParams.get("lastCursor");

    const content = await db.global.findMany({
      take: take ? parseInt(take as string) : 10,
      ...(lastCursor && {
        skip: 1,
        cursor: {
          id: lastCursor as string,
        },
      }),
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (content.length === 0) {
      return new NextResponse(
        JSON.stringify({
          data: [],
          metaData: {
            lastCursor: null,
            hasNextPage: false,
          },
        }),
        {
          status: 200,
        }
      );
    }

    const lastContentInResult: any = content[content.length - 1];
    const cursor: any = lastContentInResult.id;

    const nextPage = await db.global.findMany({
      take: take ? parseInt(take as string) : 10,
      skip: 1,
      cursor: {
        id: cursor,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const data = {
      data: content,
      metaData: {
        lastCursor: cursor,
        hasNextPage: nextPage.length > 0,
      },
    };

    return new NextResponse(JSON.stringify(data), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("[CONTENT_GET] Something went wrong", {
      status: 500,
    });
  }
}
