"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "@prisma/client";

import { ChatHeader } from "@/components/chat/chat-header";
import { ChatList } from "@/components/chat/chat-list";
import { OtherProfile } from "@/components/other-profile";
import { cn } from "@/lib/utils";
import { ChatInput } from "@/components/chat/chat-input";
import { useSearchParams } from "next/navigation";

interface ChatProps {
  profileIdParams: string;
  title?: string | null;
  image?: string;
  user: User | null;
  otherUser: User | null;
  searchQuery?: Record<string, string>;
  profileUrl: string;
  linkToUser?: string;
  apiUrl: string;
  queryKey: string;
  socketUrl: string;
  addKey: string;
  updateKey: string;
  roomParams?: string;
  otherUserId?: string;
}

export function Chat({
  otherUser,
  title,
  user,
  image,
  profileUrl,
  apiUrl,
  queryKey,
  socketUrl,
  addKey,
  updateKey,
  roomParams,
  profileIdParams,
  otherUserId,
}: ChatProps) {
  const searchParams = useSearchParams();
  const profileId = searchParams?.get("profileId");
  const ease = [0.0, 0.97, 0.53, 1.0];
  return (
    <div className={cn("flex w-full h-screen")}>
      <AnimatePresence initial={false}>
        <motion.div
          // layout
          transition={{
            layout: {
              duration: 0.3,
            },
          }}
          className={cn(
            "w-full transition-none translate-x-0",
            profileId ? "hidden lg:block" : "block"
          )}
        >
          <ChatHeader
            imageUrl={image ?? ""}
            name={title ?? ""}
            profileUrl={profileUrl}
            otherUserId={otherUserId ?? ""}
          />
          <ChatList
            currentUser={user}
            apiUrl={apiUrl}
            queryKey={queryKey}
            addKey={addKey}
            updateKey={updateKey}
            socketUrl={socketUrl}
            roomId={roomParams as string}
            profileUrl={profileUrl}
          />
          <ChatInput socketUrl={socketUrl} roomId={roomParams as string} />
        </motion.div>
        {profileIdParams ? (
          <div className="w-full h-full">
            <motion.div
              initial={{ x: 1000 }}
              animate={{ x: 0 }}
              exit={{ x: 1000 }}
              transition={{ duration: 0.6, ease: ease }}
              className="w-full h-full origin-left"
            >
              <OtherProfile user={user} otherUser={otherUser} />
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
