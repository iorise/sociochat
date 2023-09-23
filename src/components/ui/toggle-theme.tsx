"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ToggleTheme() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return (
    mounted && (
      <div className="flex flex-col gap-1 items-center text-muted-foreground tracking-wide md:tracking-widest transition-all duration-300">
        <p className="capitalize">{theme}</p>
        <div
          className="text-primary transition-all hover:cursor-pointer"
          tabIndex={0}
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? <Moon /> : <Sun />}
        </div>
      </div>
    )
  );
}
