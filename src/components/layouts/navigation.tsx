"use client";

import React from "react";
import { NavItem } from "@/types";
import { Sidebar } from "@/components/layouts/sidebar";

interface NavigationProps {
  items: NavItem[];
}

export function Navigation({ items }: NavigationProps) {
  return (
    <div>
      <aside className="fixed hidden top-0 z-30 h-screen shrink-0 overflow-y-auto border-r md:sticky md:block">
        <Sidebar items={items} />
      </aside>
    </div>
  );
}
