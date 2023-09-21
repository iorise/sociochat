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
    const { content } = req.body;

    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!content) {
      return res.status(400).json({ error: "Content missing" });
    }

    const global = await db.global.create({
      data: {
        senderId: session.user.id,
        content,
      },
      include: {
        user: true,
      },
    });

    res?.socket?.server?.io.emit("chat:global:messages", global);

    return res.status(200).json(global);
  } catch (error) {
    console.log("[GLOBAL_MESSAGES_POST] ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
