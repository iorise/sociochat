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
    const { messageId } = req.query;
    const { content } = req.body;

    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let global = await db.global.findFirst({
      where: {
        id: messageId as string,
      },
      include: {
        user: true,
      },
    });

    if (req.method === "DELETE") {
      global = await db.global.update({
        where: {
          id: messageId as string,
        },
        data: {
          content: "This message has been deleted",
          deleted: true,
        },
        include: {
          user: true,
        },
      });
    }

    if (req.method === "PATCH") {
      global = await db.global.update({
        where: {
          id: messageId as string,
        },
        data: {
          content,
        },
        include: {
          user: true,
        },
      });
    }

    const updateKey = "chat:global:messages:update";
    res?.socket?.server?.io.emit(updateKey, global);
  } catch (error) {
    console.log("[GLOBAL_MESSAGES_EDIT] ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
