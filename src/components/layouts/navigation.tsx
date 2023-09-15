"use client";

import React from "react";
import { NavItem } from "@/types";
import { Sidebar } from "@/components/layouts/sidebar";
import { MobileNav } from "@/components/layouts/mobile-nav";

interface NavigationProps {
  items: NavItem[];
}

export function Navigation({ items }: NavigationProps) {
  return (
    <div className="h-screen">
      <aside className="fixed hidden top-0 z-30 h-screen shrink-0 overflow-y-auto border-r md:sticky md:block">
        <Sidebar items={items} />
      </aside>
      <div className="fixed md:hidden justify-between w-full bottom-0 z-30 flex items-center bg-background h-14 border-t-[1px]">
        <MobileNav items={items} />
      </div>
    </div>
  );
}
