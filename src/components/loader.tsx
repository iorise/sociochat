"use client";

import { Icons } from "@/components/icons";
import { setTransition } from "@/lib/transition";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";

const loaderVariants = cva("animate-spin text-primary my-6", {
  variants: {
    size: {
      default: "w-8 h-8 md:h-10 md:w-10",
      lg: "h-10 w-10 md:h-16 md:w-16",
      sm: "h-6 w-6 md:h-7 md:w-7",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface LoaderProps extends VariantProps<typeof loaderVariants> {
  className?: string;
}

export function Loader({ className, size }: LoaderProps) {
  return (
    <AnimatePresence>
      <motion.div
        className="w-full flex items-center justify-center my-2.5 md:my-6"
        {...setTransition({
          distanceY: -80,
          typeIn: "spring",
          bounceDamping: 15,
          duration: 0.5,
        })}
      >
        <Icons.loader className={cn(loaderVariants({ size }), className)} />
      </motion.div>
    </AnimatePresence>
  );
}
