"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { User } from "@prisma/client";
import { Balancer } from "react-wrap-balancer";
import { format } from "date-fns";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Shell } from "@/components/shell";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

interface ProfileProps {
  user: User;
}

export function Profile({ user }: ProfileProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  function handleSignOut() {
    setIsLoading(true);
    signOut();
  }
  const createdAt = format(new Date(user.createdAt), "MMMM - do - yyyy");
  return (
    <Shell as="div" className="px-8 md:px-16 max-w-4xl">
      <section
        id="profile"
        className="flex flex-col w-full gap-6 items-center justify-center"
      >
        <Avatar className="w-36 h-36">
          <AvatarImage src={user.image ?? ""} alt={user.name ?? ""} />
          <AvatarFallback>
            <img src="/placeholder.png" alt={user.name ?? ""} />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-3 items-center justify-center w-full">
          <h2 className="text-2xl font-bold ">{user.name}</h2>
          <Balancer as="p" className="text-base text-muted-foreground">
            {user.bio}
          </Balancer>
        </div>
        <div className="border-2 p-8 py-3 rounded-full">status</div>
      </section>
      <Separator />
      <section id="info" className="grid gap-3">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Email"
            disabled
            value={user.email ?? ""}
            className="border-none px-0 disabled:opacity-100 disabled:cursor-auto"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Date joined</Label>
          <Input
            type="email"
            id="email"
            placeholder="Email"
            disabled
            value={createdAt}
            className="border-none px-0 disabled:opacity-100 disabled:cursor-auto"
          />
        </div>
      </section>
      <Separator />
      <section id="actions" className="flex justify-center">
        <Button
          size="lg"
          variant="outline"
          onClick={handleSignOut}
          disabled={isLoading}
        >
          Log out
        </Button>
      </section>
    </Shell>
  );
}
