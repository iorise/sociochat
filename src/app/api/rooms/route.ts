import { getAuthSession } from "@/lib/auth";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return new NextResponse("No user found", { status: 401 });
    }
    const body = await req.json();
    const { otherUserId, currentUserId } = body;
    if (!currentUserId) {
      return new NextResponse("No current user Id found", { status: 401 });
    }
    if (!otherUserId) {
      return new NextResponse("No other user Id found", { status: 401 });
    }

    const existingRoom = await db.room.findFirst({
      where: {
        AND: [
          {
            members: {
              some: {
                id: currentUserId,
              },
            },
          },
          {
            members: {
              some: {
                id: otherUserId,
              },
            },
          },
        ],
      },
      include: {
        members: true,
        messages: true,
      },
    });

    if (existingRoom) {
      return new NextResponse(JSON.stringify(existingRoom), { status: 200 });
    }

    const room = await db.room.create({
      data: {
        members: {
          connect: [
            {
              id: currentUserId,
            },
            { id: otherUserId },
          ],
        },
      },

      include: {
        members: true,
        messages: true,
      },
    });

    return NextResponse.json(room);
  } catch (error) {
    console.log("[ROOM_POST] ", error);
    return new NextResponse("[ROOM_POST]_ERROR", {
      status: 500,
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return new NextResponse("No current user found", { status: 401 });
    }
    const currentUser = session.user;
    const url = new URL(req.url);

    const take = url.searchParams.get("take");
    const lastCursor = url.searchParams.get("lastCursor");
    const rooms = await db.room.findMany({
      where: {
        members: {
          some: {
            id: currentUser?.id,
          },
        },
      },
      take: take ? parseInt(take as string) : 10,
      ...(lastCursor && {
        skip: 1,
        cursor: {
          id: lastCursor as string,
        },
      }),
      include: {
        members: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (rooms.length === 0) {
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

    const lastContentInResult: any = rooms[rooms.length - 1];
    const cursor: any = lastContentInResult.id;

    const nextPage = await db.room.findMany({
      where: {
        members: {
          some: {
            id: currentUser?.id,
          },
        },
      },
      take: take ? parseInt(take as string) : 10,
      skip: 1,
      cursor: {
        id: cursor,
      },
      include: {
        members: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const data = {
      data: rooms,
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
    return new NextResponse("[ROOM_GET]_ERROR", {
      status: 500,
    });
  }
}
