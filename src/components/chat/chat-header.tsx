"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { UserAvatar } from "@/components/user-avatar";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatHeaderProps {
  imageUrl: string;
  name: string;
  profileUrl: string;
  otherUserId: string;
}

export function ChatHeader({
  imageUrl,
  name,
  profileUrl,
  otherUserId,
}: ChatHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const handleGoBack = () => {
    router.push("/chat");
  };
  return (
    <div className="flex px-3 sm:px-8 items-center gap-2.5 h-14 border-b">
      <Button
        variant="ghost"
        onClick={handleGoBack}
        className={cn(pathname === "/" ? "hidden" : "block sm:hidden")}
      >
        <Icons.arrowLeft className="w-6 h-6" />
      </Button>
      <Link href={profileUrl + otherUserId} passHref>
        <div className="flex w-full items-center gap-3">
          <UserAvatar src={imageUrl} />
          <div className="grid">
            <h4 className="font-bold line-clamp-1">{name}</h4>
            <p className="text-muted-foreground text-sm tracking-wider">
              {/* {status ? "online" : "offline"} */}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
