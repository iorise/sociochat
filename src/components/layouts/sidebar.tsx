"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

import { NavItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";

interface SidebarProps {
  items: NavItem[];
  image: string;
}

export function Sidebar({ items, image }: SidebarProps) {
  const pathname = usePathname();
  return (
    <div className="flex flex-col items-center py-6 px-6 justify-between h-screen">
      <div className="grid gap-6">
        {items.map((item) => {
          const Icon = Icons[item.icon ?? "chat"];
          return (
            <Button
              key={item.title}
              variant="ghost"
              className={cn(
                "rounded-full w-14 h-14",
                pathname === item.href && "bg-accent"
              )}
              asChild
            >
              <Link href={item.href}>
                <Icon
                  className={cn(
                    `w-10 h-10 text-muted-foreground transition-all duration-300`,
                    pathname === item.href && "text-primary"
                  )}
                />
              </Link>
            </Button>
          );
        })}
      </div>
      <Button
        variant="muted"
        className={cn(
          "rounded-full w-14 h-14",
          pathname === "/profile" && "bg-accent"
        )}
        asChild
      >
        <Link href="/profile">
          <UserAvatar src={image} alt="" />
        </Link>
      </Button>
    </div>
  );
}
