"use client";

import React from "react";
import { format } from "date-fns";
import Balancer from "react-wrap-balancer";

import { Shell } from "@/components/shell";
import { UserAvatar } from "@/components/user-avatar";
import { User } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface OtherProfileProps {
  user: User | null | undefined;
}

export function OtherProfile({ user }: OtherProfileProps) {
  const removeProfileIdParam = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const url = new URL(window.location.href);
    url.searchParams.delete("profileId");
    window.location.href = url.toString();
  };
  const createdAt = format(new Date(user!.createdAt), "MMMM - do - yyyy");
  return (
    <Shell as="section" className="relative border-l w-full h-full">
      <Button
        variant="ghost"
        className="absolute top-10 right-10 text-xl"
        onClick={removeProfileIdParam}
      >
        x
      </Button>
      <section
        id="profile"
        className="flex flex-col gap-3 items-center justify-center"
      >
        <UserAvatar size="lg" src={user?.image || ""} />
        <div className="flex flex-col gap-3 items-center justify-center w-full">
          <h2 className="text-2xl font-bold ">{user?.name}</h2>
          <Balancer as="p" className="text-base text-muted-foreground">
            {user?.bio}
          </Balancer>
        </div>
        <div tabIndex={0} className="border-2 p-6 py-1.5 rounded-full">
          status
        </div>
        <Separator />
      </section>
      <section id="info" className="grid gap-3 -mt-40">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Email"
            disabled
            value={user?.email ?? ""}
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
      <section id="action" className="-mt-20 flex items-center justify-center">
        <Button onClick={() => {}}>Message</Button>
      </section>
    </Shell>
  );
}
