"use client";

import React from "react";
import qs from "query-string";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "@prisma/client";

import { ChatHeader } from "@/components/chat/chat-header";
import { ChatList } from "@/components/chat/chat-list";
import { OtherProfile } from "@/components/other-profile";
import { cn } from "@/lib/utils";
import { ChatInput } from "@/components/chat/chat-input";

interface ChatProps {
  params: string;
  title?: string;
  image?: string;
  user: User | null;
  otherUser: User | null;
  searchQuery?: Record<string, string>;
  url: string;
  linkToUser?: string;
  apiUrl: string;
  queryKey: string;
}

export function Chat({
  params,
  otherUser,
  title,
  user,
  image,
  searchQuery,
  url,
  linkToUser,
  apiUrl,
  queryKey,
}: ChatProps) {
  const query = qs.stringifyUrl({
    url: url,
    query: searchQuery,
  });
  const ease = [0.0, 0.97, 0.53, 1.0];
  return (
    <div className={cn("flex w-full h-screen")}>
      <AnimatePresence initial={false}>
        <motion.div
          layout
          transition={{
            type: "tween",
            ease: ease,
            duration: 0.6,
          }}
          className={cn(
            "origin-right w-full",
            params ? "hidden md:block" : "block"
          )}
        >
          <ChatHeader
            imageUrl={image || ""}
            name={title!}
            userUrl={query}
          />
          <ChatList
            linkToUser={linkToUser}
            currentUser={user}
            apiUrl={apiUrl}
            queryKey={queryKey}
          />
          <ChatInput />
        </motion.div>
        {params ? (
          <div className="w-full h-full">
            <motion.div
              initial={{ x: 1000 }}
              animate={{ x: 0 }}
              exit={{ x: 1000 }}
              transition={{ duration: 0.6, ease: ease }}
              className="w-full h-full origin-left"
            >
              <OtherProfile user={otherUser} />
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
