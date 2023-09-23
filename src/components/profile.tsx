"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { User } from "@prisma/client";
import { Balancer } from "react-wrap-balancer";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";
import { useForm } from "react-hook-form";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Shell } from "@/components/shell";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setTransition } from "@/lib/transition";
import { UserAvatar } from "@/components/user-avatar";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/use-modal";
import { Footer } from "@/components/layouts/footer";
import { zodResolver } from "@hookform/resolvers/zod";
import { settingsSchema } from "@/lib/validations/settings";

interface ProfileProps {
  user: User;
}

type Inputs = z.infer<typeof settingsSchema>;

export function Profile({ user }: ProfileProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const { open, closeModal, openModal } = useModal();

  function handleSignOut() {
    try {
      setIsLoading(true);
      signOut();
      toast.success("Sign out successfully");
      router.push("/sign-in");
    } catch (error: any) {
      console.log(error);
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const form = useForm<Inputs>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      image: user.image,
    },
  });

  function imageSubmit(data: Inputs) {}

  const createdAt = format(new Date(user.createdAt), "MMMM - do - yyyy");
  return (
    <Shell as={motion.div} className="max-w-4xl">
      <motion.section
        {...setTransition({
          typeIn: "spring",
          distanceY: 100,
          delay: 0.3,
        })}
        id="profile"
        className="flex flex-col w-full gap-6 items-center justify-center"
      >
        <UserAvatar
          onClick={openModal}
          src={user.image || ""}
          alt={user.name || ""}
          size="xl"
          variant="focus"
          tabIndex={0}
        />
        <div className="flex flex-col gap-3 items-center justify-center w-full">
          <h2 className="text-2xl font-bold ">{user.name}</h2>
          <Balancer as="p" className="text-base text-muted-foreground">
            {user.bio}
          </Balancer>
        </div>
        <div tabIndex={0} className="border-2 p-8 py-3 rounded-full">
          status
        </div>
        <Separator />
      </motion.section>
      <Modal open={open} closeModal={closeModal} modalClassName="max-w-lg">
        <Image
          src={user.image}
          alt={user.name || ""}
          sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
          width={200}
          height={200}
          loading="lazy"
          className="rounded-full aspect-square object-cover"
        />
      </Modal>
      <motion.section
        {...setTransition({
          typeIn: "spring",
          distanceY: 100,
          delay: 0.4,
        })}
        id="info"
        className="grid gap-3"
      >
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
            type="text"
            id="email"
            disabled
            value={createdAt}
            className="border-none px-0 disabled:opacity-100 disabled:cursor-auto"
          />
        </div>
        <Separator />
      </motion.section>
      <motion.section
        {...setTransition({
          typeIn: "spring",
          distanceY: 100,
          delay: 0.5,
        })}
        id="actions"
        className="flex justify-center"
      >
        <Button
          size="lg"
          variant="outline"
          onClick={handleSignOut}
          disabled={isLoading}
        >
          Log out
        </Button>
      </motion.section>
      <motion.section
        {...setTransition({
          typeIn: "spring",
          distanceY: 100,
          delay: 0.6,
        })}
        id="footer"
        className="w-full"
      >
        <Footer />
      </motion.section>
    </Shell>
  );
}
