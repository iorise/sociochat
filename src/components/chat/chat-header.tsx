"use client";

import React from "react";
import Link from "next/link";
import { UserAvatar } from "@/components/user-avatar";

interface ChatHeaderProps {
  imageUrl: string;
  name: string;
  userUrl: string;
}

export function ChatHeader({ imageUrl, name, userUrl }: ChatHeaderProps) {
  return (
    <section className="flex px-3 items-center gap-3 h-14 border-b">
      <Link href={userUrl} passHref>
        <UserAvatar src={imageUrl} />
      </Link>
      <div className="grid">
        <h4 className="font-bold">{name}</h4>
        <p className="text-muted-foreground text-sm tracking-wider">
          {/* {status ? "online" : "offline"} */}
        </p>
      </div>
    </section>
  );
}
