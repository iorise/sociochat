"use client";

import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import qs from "query-string";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface ChatInputProps {
  socketUrl: string;
  roomId: string;
}

const Inputs = z.object({
  content: z.string().min(1),
});

export function ChatInput({ socketUrl, roomId }: ChatInputProps) {
  const form = useForm<z.infer<typeof Inputs>>({
    resolver: zodResolver(Inputs),
    defaultValues: {
      content: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(data: z.infer<typeof Inputs>) {
    try {
      const url = qs.stringifyUrl({
        url: socketUrl,
        query: {
          roomId,
        },
      });
      await axios.post(url, data);
      toast.success("Message sent");
      form.reset();
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div
                  className="w-full flex px-3 py-2 items-center"
                >
                  <Input
                    disabled={isLoading}
                    placeholder="Type a message..."
                    className="rounded-full"
                    {...field}
                  />
                  <Button
                    variant="muted"
                    className="rounded-full"
                    onClick={(e) => {
                      e.preventDefault();
                      form.handleSubmit(onSubmit)();
                    }}
                    size="sm"
                    disabled={isLoading}
                  >
                    <Icons.send />
                  </Button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
