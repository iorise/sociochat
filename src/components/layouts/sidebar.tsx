"use client";

import Link from "next/link";
import React from "react";

import { NavItem } from "@/types";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  items: NavItem[];
}

export function Sidebar({ items }: SidebarProps) {
  return (
    <div className="flex flex-col items-center py-6 px-6 justify-between h-screen">
      <div className="grid gap-6">
        {items.map((item) => (
          <Button key={item.title} asChild>
            <Link href={item.href}>{item.title}</Link>
          </Button>
        ))}
      </div>
      <Button asChild>
        <Link href="/profile">Profile</Link>
      </Button>
    </div>
  );
}
