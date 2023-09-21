"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";

interface MobileNavProps {
  items: NavItem[];
  image: string;
}

export function MobileNav({ items, image }: MobileNavProps) {
  const pathname = usePathname();
  return (
    <div className="flex w-full justify-around items-center">
      {items.map((item) => {
        const Icon = Icons[item.icon ?? "chat"];
        return (
          <Button
            key={item.title}
            variant="ghost"
            className={cn(
              "rounded-full p-0 px-2 py-2",
              pathname === item.href && "bg-accent"
            )}
            asChild
          >
            <Link href={item.href}>
              <Icon
                className={cn(
                  `w-6 h-6 text-muted-foreground transition-all duration-300`,
                  pathname === item.href && "text-primary"
                )}
              />
            </Link>
          </Button>
        );
      })}
      <Button
        variant="ghost"
        className={cn(
          "rounded-full p-0 px-2 py-2",
          pathname === "/profile" && "bg-accent"
        )}
        asChild
      >
        <Link href="/profile">
          <UserAvatar src={image} alt="" size="xs" />
        </Link>
      </Button>
    </div>
  );
}
