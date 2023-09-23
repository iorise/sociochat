"use client";

import React from "react";
import Balancer from "react-wrap-balancer";
import axios from "axios";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { User } from "@prisma/client";

import { UserAvatar } from "@/components/user-avatar";
import { Separator } from "@/components/ui/separator";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

interface OtherProfileProps {
  user: User | null;
  otherUser: User | null;
}

export function OtherProfile({ user, otherUser }: OtherProfileProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const deleteQuery = React.useCallback(() => {
    const newQuery = new URLSearchParams(searchParams?.toString());
    newQuery.delete("profileId");
    const newUrl = `${window.location.pathname}?${newQuery.toString()}`;
    window.history.pushState({}, "", newUrl);
    router.push(newUrl);
    return newUrl;
  }, [searchParams, router]);

  const otherUserId = otherUser?.id;

  const handleMessage = async () => {
    try {
      setIsLoading(true);
      const { data, status } = await axios.post("/api/rooms", {
        otherUserId,
        currentUserId: user?.id,
      });

      if (status === 200 || status === 201) {
        const roomId = data.id;
        router.push(`/chat/${roomId}`);
      } else {
        toast.error("Cannot create room");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const createdAt = format(new Date(otherUser!.createdAt), "MMMM - d - yyyy");
  return (
    <div className="flex flex-col gap-10 container w-full h-full border-l">
      <section className="mx-[-6rem] flex sm:px-8 items-center gap-2.5 h-14 border-b">
        <h2 className="flex w-full justify-center py-2 font-bold text-lg">
          Information
        </h2>
        <Button
          className="absolute right-10"
          variant="ghost"
          onClick={() => deleteQuery()}
        >
          <Icons.x className="w-6 h-6" />
        </Button>
      </section>
      <div className="grid gap-10">
        <section
          id="profile"
          className="flex flex-col gap-3 items-center justify-center"
        >
          <UserAvatar size="lg" src={otherUser?.image || ""} />
          <div className="flex flex-col gap-3 items-center justify-center w-full">
            <h2 className="text-2xl font-bold ">{otherUser?.name}</h2>
            <Balancer as="p" className="text-base text-muted-foreground">
              {otherUser?.bio}
            </Balancer>
          </div>
          <div tabIndex={0} className="border-2 p-6 py-1.5 rounded-full">
            status
          </div>
          <Separator />
        </section>
        <section id="info" className="grid gap-3">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              disabled
              value={otherUser?.email ?? ""}
              className="border-none px-0 disabled:opacity-100 disabled:cursor-auto text-muted-foreground"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="date">Date joined</Label>
            <Input
              type="type"
              id="date"
              placeholder="Date"
              value={createdAt}
              disabled
              className="border-none px-0 disabled:opacity-100 disabled:cursor-auto text-muted-foreground"
            />
          </div>
          <Separator />
        </section>
        <section id="action" className="flex items-center justify-center">
          <Button disabled={isLoading} onClick={() => handleMessage()}>
            Message
          </Button>
        </section>
      </div>
    </div>
  );
}
