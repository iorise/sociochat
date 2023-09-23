"use client";

import * as React from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import Link from "next/link";
import { User } from "@prisma/client";
import axios from "axios";
import qs from "query-string";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { UserAvatar } from "@/components/user-avatar";
import { GlobalWithUser } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { setTransition } from "@/lib/transition";

interface ChatBoxProps {
  message: GlobalWithUser;
  currentUser: User | null;
  socketUrl: string;
  profileUrl: string;
  roomId?: string;
}

const formSchema = z.object({
  content: z.string().min(1),
});

export function ChatBox({
  message,
  currentUser,
  socketUrl,
  profileUrl,
  roomId,
}: ChatBoxProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const isSentByCurrentUser = message.user?.id === currentUser?.id;
  const createdAt = format(new Date(message.createdAt), "HH.mm");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: message.content,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url: `${socketUrl}/${message.id}`,
        query: {
          messageId: message.id,
          roomId,
        },
      });

      await axios.patch(url, data);

      form.reset();
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    form.reset({
      content: message.content,
    });
  }, [message.content]);

  return (
    <motion.div
      {...setTransition({
        duration: 0.5,
      })}
      className={cn(
        "w-full flex gap-2 items-center transition px-6 py-2",
        isSentByCurrentUser ? "justify-end" : "justify-start"
      )}
    >
      <Link
        href={`${profileUrl}?profileId=${message.user.id}`}
        className={cn(isSentByCurrentUser && "hidden")}
      >
        <UserAvatar
          src={message.user.image}
          size="sm"
          className="active:scale-95 transition-all duration-300"
        />
      </Link>
      <div className="flex flex-col gap-0.5">
        {!isSentByCurrentUser && (
          <p className="break-words text-sm md:text-base font-bold">
            {message.user.name}
          </p>
        )}
        <div className="flex gap-1 items-center">
          {isSentByCurrentUser &&
            (!isEditing ? (
              <Button
                onClick={() => {
                  setIsEditing(!isEditing);
                }}
                variant="ghost"
                className="rounded-full"
                type="button"
              >
                <Icons.edit className="w-4 h-4" />
              </Button>
            ) : null)}
          <div
            className={
              "flex bg-accent items-center px-3 py-1.5 md:px-4 md:py-2.5 rounded-xl"
            }
          >
            {isEditing ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            readOnly={!isEditing}
                            className="px-0 py-0 bg-transparent border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:italic disabled:pointer-events-none"
                            placeholder="Edit message..."
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-1">
                    <Button
                      onClick={() => {
                        setIsEditing(false);
                      }}
                      type="button"
                      variant="ghost"
                    >
                      <Icons.x className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      className="rounded-full"
                      disabled={!form.formState.isValid || isLoading}
                    >
                      <Icons.check className="w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </Form>
            ) : (
              <p className="break-all text-sm md:text-base">
                {message.content}
              </p>
            )}
          </div>
        </div>
        <p
          className={cn(
            "flex px-3 text-[0.7rem] md:text-sm text-muted-foreground",
            isSentByCurrentUser ? "justify-end" : "justify-start"
          )}
        >
          {createdAt.toLocaleString()}
        </p>
      </div>
    </motion.div>
  );
}
