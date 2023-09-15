"use client";

import { NavItem } from "@/types";
import { Button } from "../ui/button";
import Link from "next/link";

interface MobileNavProps {
  items: NavItem[];
}

export function MobileNav({ items }: MobileNavProps) {
  return (
    <div className="flex w-full justify-around">
      {items.map((item) => (
        <Button key={item.href} asChild>
          <Link href={item.href}>{item.title}</Link>
        </Button>
      ))}
      <Button asChild>
        <Link href="/profile">Profile</Link>
      </Button>
    </div>
  );
}
