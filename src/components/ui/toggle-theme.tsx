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
  });

  return (
    mounted && (
      <Button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        {theme === "light" ? <Moon /> : <Sun />}
      </Button>
    )
  );
}
