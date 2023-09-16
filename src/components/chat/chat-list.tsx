"use client";

import React from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";

import { ChatBox } from "@/components/chat/chat-box";
import { GlobalWithUser } from "@/types";
import { User } from "@prisma/client";
import { useChatQuery } from "@/hooks/use-chat-query";
import { Icons } from "@/components/icons";
import { setTransition } from "@/lib/transition";
import { useChatSocket } from "@/hooks/use-chat-socket";

interface ChatListProps {
  apiUrl: string;
  queryKey: string;
  currentUser: User | null;
  addKey: string;
  updateKey: string;
  socketUrl: string;
}

export function ChatList({
  currentUser,
  apiUrl,
  queryKey,
  addKey,
  updateKey,
  socketUrl,
}: ChatListProps) {
  const { ref, inView } = useInView();

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isSuccess,
    isLoading,
  } = useChatQuery({
    apiUrl: apiUrl,
    queryKey,
  });

  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  useChatSocket({
    queryKey,
    addKey,
    updateKey,
  });
  return (
    <AnimatePresence mode="popLayout">
      <section id="chat-list" className="w-full">
        <div className="h-[calc(100vh_-_10.5rem)] md:h-[calc(100vh_-_7rem)] max-w-full overflow-y-auto flex flex-col-reverse w-full hide-scrollbar">
          {isSuccess &&
            data?.pages.map((page) =>
              page.data.map((message: GlobalWithUser, index: number) => {
                if (page.data.length === index + 1) {
                  return (
                    <motion.div
                      ref={ref}
                      key={message.id}
                      {...setTransition({
                        duration: 0.5,
                      })}
                    >
                      <ChatBox
                        key={message.id}
                        message={message}
                        currentUser={currentUser}
                        socketUrl={socketUrl}
                      />
                    </motion.div>
                  );
                } else {
                  return (
                    <motion.div
                      key={message.id}
                      {...setTransition({
                        duration: 0.5,
                      })}
                    >
                      <ChatBox
                        key={message.id}
                        message={message}
                        currentUser={currentUser}
                        socketUrl={socketUrl}
                      />
                    </motion.div>
                  );
                }
              })
            )}
          {isLoading ? (
            <motion.div
              {...setTransition({
                typeIn: "spring",
                distanceY: -40,
                duration: 0.5,
              })}
              className="w-full h-full flex items-center justify-center"
            >
              <Icons.loader
                className="animate-spin
              h-10 w-10 md:h-16 md:w-16 text-accent"
              />
            </motion.div>
          ) : null}
          {isFetchingNextPage ? (
            <motion.div
              {...setTransition({
                distanceY: -80,
                typeIn: "spring",
                bounceDamping: 15,
                duration: 0.5,
              })}
              className="w-full flex items-center justify-center py-5"
            >
              <Icons.loader className="animate-spin h-6 w-6 md:h-10 md:w-10 text-accent" />
            </motion.div>
          ) : null}
        </div>
      </section>
    </AnimatePresence>
  );
}
