import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface CustomLinkProps {
  href: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  children: React.ReactNode;
  className?: string;
}

export default function CustomLink({
  href,
  target,
  className,
  children,
}: CustomLinkProps) {
  return (
    <Link
      href={href}
      target={target}
      className={cn("animate-underline", className)}
    >
      {children}
    </Link>
  );
}
