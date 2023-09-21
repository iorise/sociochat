"use client";

import { motion, AnimatePresence } from "framer-motion";
import { RoomWithUser } from "@/types";
import { User } from "@prisma/client";
import React from "react";
import { UserAvatar } from "./user-avatar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { setTransition } from "@/lib/transition";

interface RoomBoxProps {
  room: RoomWithUser;
  currentUser?: User | null;
  otherUser?: User | null;
}

export function RoomBox({ room, otherUser }: RoomBoxProps) {
  const pathname = usePathname();
  return (
    <AnimatePresence>
      <Link href={`/chat/${room.id}`} passHref>
        <motion.div
          {...setTransition()}
          className={cn(
            "px-1.5 py-2 flex w-full hover:bg-accent transition-all duration-150 truncate font-bold ",
            pathname === `/chat/${room.id}` && "bg-accent"
          )}
        >
          <div className="flex items-center gap-2">
            <UserAvatar
              src={otherUser?.image ?? ""}
              alt={otherUser?.name ?? ""}
              size="md"
            />
            <p className="text-sm md:text-base">
             {otherUser?.name ?? ""}
            </p>
          </div>
        </motion.div>
      </Link>
    </AnimatePresence>
  );
}
