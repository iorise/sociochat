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

interface ChatBoxProps {
  message: GlobalWithUser;
  currentUser: User | null;
  socketUrl: string;
}

const formSchema = z.object({
  content: z.string().min(1),
});

export function ChatBox({ message, currentUser, socketUrl }: ChatBoxProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const isSentByCurrentUser = message.user.id === currentUser?.id;
  const createdAt = format(new Date(message.createdAt), "HH.mm");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: message.content,
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const url = qs.stringifyUrl({
        url: `${socketUrl}/${message.id}`,
        query: {
          messageId: message.id,
        },
      });

      await axios.patch(url, data);

      form.reset();
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      className={cn(
        "w-full flex gap-2 items-center transition px-6 py-2",
        isSentByCurrentUser ? "justify-end" : "justify-start"
      )}
    >
      <Link
        href={`/?profileId=${message.user.id}`}
        className={cn(isSentByCurrentUser && "hidden")}
      >
        <UserAvatar src={message.user.image} size="sm" />
      </Link>
      <div className="flex flex-col gap-0.5">
        {!isSentByCurrentUser && (
          <p className="break-words text-sm md:text-base font-bold px-3">
            {message.user.name}
          </p>
        )}
        <div className="flex gap-5 items-center">
          {isSentByCurrentUser && (
            <div className="flex gap-2 mr-3">
              <Button
                onClick={() => {
                  setIsEditing(!isEditing);
                }}
                variant="ghost"
              >
                <Icons.edit className="w-4 h-4" />
              </Button>
              {isEditing ? (
                <Button
                  variant="ghost"
                  className="rounded-full text-sm"
                  onClick={() =>
                    onSubmit({ content: form.getValues().content })
                  }
                >
                  <Icons.check className="w-4 h-4" />
                </Button>
              ) : (
                <Button variant="ghost">
                  <Icons.delete className="w-4 h-4" />
                </Button>
              )}
            </div>
          )}
          <div
            className={
              "flex bg-accent items-center px-3 py-1.5 md:px-4 md:py-2.5 rounded-xl w-full max-w-xl break-words"
            }
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        {isEditing ? (
                          <Input
                            disabled={isLoading}
                            className="px-0 py-0 bg-transparent border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:italic"
                            placeholder="Edit message..."
                            {...field}
                          />
                        ) : (
                          <p className="break-all text-sm md:text-base">
                            {message.content}
                          </p>
                        )}
                      </FormControl>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
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
    </div>
  );
}
