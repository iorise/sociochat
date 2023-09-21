"use client";

import { motion, AnimatePresence } from "framer";
import { setTransition } from "@/lib/transition";
import { Icons } from "@/components/icons";

export function EmptyState() {
  return (
    <AnimatePresence>
      <motion.div
        {...setTransition({
          typeIn: "spring",
          typeOut: "spring",
          bounceDamping: 6,
          duration: 0.2,
          distanceX: -250,
        })}
        className="hidden sm:flex flex-col gap-3 md:gap-6 w-full h-full items-center justify-center"
      >
        <Icons.penSquare className="w-8 h-8 md:w-16 md:h-16 text-primary" />
        <span className="text-sm md:text-lg text-muted-foreground">
          You have no conversation yet
        </span>
      </motion.div>
    </AnimatePresence>
  );
}
