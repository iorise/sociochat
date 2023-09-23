import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { NextApiResponseServerIO } from "@/types";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  if (req.method !== "DELETE" && req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    const { messageId, roomId } = req.query;
    const { content } = req.body;

    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const room = await db.room.findFirst({
      where: {
        id: roomId as string,
        members: {
          some: {
            id: session.user.id,
          },
        },
      },
    });

    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    let message = await db.message.findFirst({
      where: {
        id: messageId as string,
        roomId: roomId as string,
      },
      include: {
        user: true,
        room: true,
      },
    });

    if (req.method === "DELETE") {
      message = await db.message.update({
        where: {
          id: messageId as string,
          roomId: roomId as string,
        },
        data: {
          content: "This message has been deleted",
          deleted: true,
        },
        include: {
          user: true,
          room: true,
        },
      });
    }

    if (req.method === "PATCH") {
      message = await db.message.update({
        where: {
          id: messageId as string,
          roomId: roomId as string,
        },
        data: {
          content,
        },
        include: {
          user: true,
          room: true,
        },
      });
    }

    const updateKey = `chat:${roomId}:messages:update`;
    res?.socket?.server?.io.emit(updateKey, message);


    return res.status(200).json(message);
  } catch (error) {
    console.log("[CHAT_MESSAGES_EDIT] ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
