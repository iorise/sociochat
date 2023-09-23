import Link from "next/link";

import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen">
      <Link
        href="/"
        className="absolute left-8 top-6 z-20 flex items-center text-lg font-bold tracking-tight"
      >
        <Icons.chat className="mr-2 h-6 w-6" aria-hidden="true" />
        <span>{siteConfig.name}</span>
      </Link>
      {children}
    </div>
  );
}
