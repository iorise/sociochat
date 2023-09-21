"use client";

import React from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "@prisma/client";

import { ChatBox } from "@/components/chat/chat-box";
import { GlobalWithUser } from "@/types";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { Icons } from "@/components/icons";
import { setTransition } from "@/lib/transition";
import { useChatSocket } from "@/hooks/use-chat-socket";
import { Loader } from "@/components/loader";

interface ChatListProps {
  apiUrl: string;
  queryKey: string;
  currentUser: User | null;
  addKey: string;
  updateKey: string;
  socketUrl: string;
  roomId: string;
  profileUrl: string;
}

export function ChatList({
  currentUser,
  apiUrl,
  queryKey,
  addKey,
  updateKey,
  socketUrl,
  roomId,
  profileUrl,
}: ChatListProps) {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isSuccess,
    isLoading,
  } = useInfiniteScroll({
    apiUrl: apiUrl,
    queryKey,
    roomId,
  });

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  useChatSocket({
    queryKey,
    addKey,
    updateKey,
  });
  return (
    <AnimatePresence mode="popLayout">
      <section id="chat-list" className="w-full">
        <div className="h-[calc(100vh_-_10.5rem)] md:h-[calc(100vh_-_7rem)] max-w-full overflow-y-auto flex flex-col-reverse w-full hide-scrollbar">
          {(isSuccess && data?.pages.length === 0) ||
          data?.pages[0].data.length === 0 ? (
            <motion.div
              {...setTransition({
                typeIn: "spring",
                typeOut: "spring",
                bounceDamping: 6,
                duration: 0.2,
                distanceX: 250,
              })}
              className="flex flex-col gap-2.5 md:gap-4 w-full h-full items-center justify-center text-muted-foreground"
            >
              <Icons.edit className="w-8 h-8 md:h-12 md:w-12 border-b text-primary" />
              Type something.
            </motion.div>
          ) : (
            data?.pages.map((page) =>
              page.data.map((message: GlobalWithUser, index: number) => {
                console.log("length: ", page.data.length);
                return page.data.length === index + 1 ? (
                  <div ref={ref} key={message.id}>
                    <ChatBox
                      key={message.id}
                      message={message}
                      currentUser={currentUser}
                      socketUrl={socketUrl}
                      profileUrl={profileUrl}
                    />
                  </div>
                ) : (
                  <ChatBox
                    key={message.id}
                    message={message}
                    currentUser={currentUser}
                    socketUrl={socketUrl}
                    profileUrl={profileUrl}
                  />
                );
              })
            )
          )}
          {isLoading ? (
            <div className="flex w-full h-full items-center justify-center">
              <Loader size="lg" />
            </div>
          ) : isFetchingNextPage ? (
            <Loader />
          ) : null}
        </div>
      </section>
    </AnimatePresence>
  );
}
