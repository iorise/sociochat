import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

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
    return new NextResponse("[GLOBAL_MESSAGES_GET]_Something went wrong", {
      status: 500,
    });
  }
}
