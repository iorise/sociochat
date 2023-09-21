import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { NextApiResponseServerIO } from "@/types";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    const { roomId } = req.query;
    const { content } = req.body;

    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!roomId) {
      return res.status(400).json({ error: "Room ID missing" });
    }

    if (!content) {
      return res.status(400).json({ error: "Content missing" });
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

    const message = await db.message.create({
      data: {
        roomId: roomId as string,
        senderId: session.user.id,
        content,
        isRead: false,
      },
      include: {
        user: true,
        room: true,
      },
    });

    const roomKey = `chat:${roomId}:messages`;

    res?.socket?.server?.io.emit(roomKey, message);

    return res.status(200).json(message);
  } catch (error) {
    console.log("[CHAT_MESSAGES_POST] ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
