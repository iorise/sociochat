"use client";

import React from "react";
import { format } from "date-fns";

import { UserAvatar } from "@/components/user-avatar";
import { GlobalWithUser } from "@/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { User } from "@prisma/client";

interface ChatBoxProps {
  message: GlobalWithUser;
  currentUser: User | null;
}

export function ChatBox({ message, currentUser }: ChatBoxProps) {
  const isSentByCurrentUser = message.user.id === currentUser?.id;
  const createdAt = format(new Date(message.createdAt), "HH.mm");
  return (
    <div
      className={cn(
        "w-full flex gap-2 items-center transition px-6 py-2",
        isSentByCurrentUser ? "justify-end" : "justify-start"
      )}
    >
      <Link
        href={`/?profileId=${message.user.id}`}
        className={cn(isSentByCurrentUser && "hidden")}
      >
        <UserAvatar src={message.user.image} size="sm" />
      </Link>
      <div className="flex flex-col gap-0.5">
        {!isSentByCurrentUser && (
          <p className="break-words text-sm md:text-base font-bold px-3">
            {message.user.name}
          </p>
        )}
        <div
          className={
            "flex bg-accent items-center px-3 py-1.5 md:px-4 md:py-2.5 rounded-md w-full max-w-xl break-words"
          }
        >
          <p className="break-all text-sm md:text-base">{message.content}</p>
        </div>
        <p
          className={cn(
            "flex px-3 text-[0.7rem] md:text-sm text-muted-foreground",
            isSentByCurrentUser ? "justify-end" : "justify-start"
          )}
        >
          {createdAt.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
