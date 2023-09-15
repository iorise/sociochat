"use client";

import React from "react";

import { Heading, PageHeaderHeading } from "@/components/heading";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePathname } from "next/navigation";
import { RoomBox } from "@/components/room-box";

interface RoomListProps {
  title: string;
  roomUrl?: string;
}

export function RoomList({ title, roomUrl }: RoomListProps) {
  const pathname = usePathname();
  return (
    <section id="chat-name" className="w-[20rem] hidden md:block">
      <Heading>
        <PageHeaderHeading>{title}</PageHeaderHeading>
      </Heading>
      <ScrollArea className="h-[calc(100vh_-_7rem)] md:h-[calc(100vh_-_3.5rem)] border-r">
        <RoomBox />
      </ScrollArea>
    </section>
  );
}
