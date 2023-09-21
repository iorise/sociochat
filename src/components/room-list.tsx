"use client";

import React from "react";
import { User } from "@prisma/client";
import { useInView } from "react-intersection-observer";
import { usePathname } from "next/navigation";

import { Heading, PageHeaderHeading } from "@/components/heading";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RoomBox } from "@/components/room-box";
import { RoomWithUser } from "@/types";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/loader";

interface RoomListProps {
  title: string;
  roomUrl?: string;
  currentUser?: User | null;
  apiUrl?: string;
  queryKey?: string;
  global?: boolean;
}

export function RoomList({
  title,
  currentUser,
  apiUrl,
  queryKey,
  global,
}: RoomListProps) {
  const pathname = usePathname();
  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  const {
    data: conversation,
    hasNextPage,
    fetchNextPage,
    isSuccess,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteScroll({
    apiUrl: apiUrl as string,
    queryKey: queryKey as string,
  });

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <section
      id="chat-list"
      className={cn(
        pathname === "/chat" ? "block" : "hidden sm:block",
        pathname === "/" ? "hidden sm:block" : "",
        "w-full"
      )}
    >
      <Heading>
        <PageHeaderHeading>{title}</PageHeaderHeading>
      </Heading>
      <ScrollArea className="w-full h-[calc(100vh_-_7rem)] md:h-[calc(100vh_-_3.5rem)] border-r">
        {global ? (
          <div
            className={cn(
              pathname === "/" && "bg-accent",
              "px-4 py-2 flex items-center gap-2 justify-center w-full hover:bg-accent transition-all duration-150 font-bold"
            )}
          >
            <Icons.google className="w-7 h-7 md:h-8 md:w-8" />
            Get started
          </div>
        ) : (isSuccess && conversation?.pages.length === 0) ||
          conversation?.pages[0].data.length === 0 ? (
          <div className="flex w-full h-full items-center justify-center mt-12">
            Find people
          </div>
        ) : (
          conversation?.pages.map((page) =>
            page.data.map((room: RoomWithUser, index: number) => {
              const otherUser = room.members.find(
                (user) => user.id !== currentUser?.id
              );
              return page.data.length === index + 1 ? (
                <div ref={ref} key={index}>
                  <RoomBox
                    key={room.id}
                    room={room}
                    currentUser={currentUser}
                    otherUser={otherUser}
                  />
                </div>
              ) : (
                <RoomBox
                  key={room.id}
                  room={room}
                  currentUser={currentUser}
                  otherUser={otherUser}
                />
              );
            })
          )
        )}
        {isLoading || (isFetchingNextPage && hasNextPage) ? <Loader /> : null}
      </ScrollArea>
    </section>
  );
}
