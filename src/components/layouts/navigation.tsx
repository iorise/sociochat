"use client";

import React from "react";
import { NavItem } from "@/types";
import { Sidebar } from "@/components/layouts/sidebar";
import { MobileNav } from "@/components/layouts/mobile-nav";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavigationProps {
  items: NavItem[];
  image: string;
}

export function Navigation({ items, image }: NavigationProps) {
  const pathname = usePathname() || "";

  const hideMobileNavPatterns = [/^\/chat$/, /^\/chat\//];

  const shouldHideMobileNav = hideMobileNavPatterns.some(pattern =>
    pattern.test(pathname)
  );

  return (
    <div className="h-screen">
      <aside className=" hidden w-20 top-0 z-30 h-screen shrink-0 overflow-y-auto border-r md:block fixed">
        <Sidebar items={items} image={image} />
      </aside>
      <div
        className={cn(
          "fixed md:hidden justify-between w-full bottom-0 z-30 flex items-center bg-background h-14 border-t-[1px]",
          shouldHideMobileNav  ? "hidden" : ""
        )}
      >
        <MobileNav items={items} image={image} />
      </div>
    </div>
  );
}
