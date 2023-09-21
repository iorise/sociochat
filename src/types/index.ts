import { type Icons } from "@/components/icons";
import { Prisma } from "@prisma/client";
import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";

export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
}

export type GlobalWithUser = Prisma.GlobalGetPayload<{
  include: { user: true };
}>;

export type DirectMessageWithUser = Prisma.MessageGetPayload<{
  include: { user: true };
}>

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export type RoomWithUser = Prisma.RoomGetPayload<{
  include: {members: true}
}>
