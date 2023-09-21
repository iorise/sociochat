"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { loginSchema } from "@/lib/validations/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

type Inputs = z.infer<typeof loginSchema>;

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const callbackUrl = searchParams!.get("callbackUrl") || "/";

  const form = useForm<Inputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  React.useEffect(() => {
    form.setFocus("email");
  }, []);

  const loginLoading = form.formState.isSubmitting;

  async function onSubmit(data: Inputs) {
    try {
      const signInData = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl,
      });
      if (!signInData?.error) {
        toast.success("Login successfully");
        router.push(callbackUrl);
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function googleLogin() {
    try {
      setIsLoading(true);
      await signIn("google");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid w-full items-center gap-3.5">
          <Button disabled={loginLoading || isLoading}>
            {loginLoading ? (
              <Icons.loader className="w-6 h-6 animate-spin text-muted-foreground" />
            ) : (
              "Log in"
            )}
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-4 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button
            type="button"
            disabled={isLoading || loginLoading}
            onClick={googleLogin}
            className="active:scale-100 "
          >
            {isLoading ? (
              <Icons.loader className="w-6 h-6 animate-spin text-muted-foreground" />
            ) : (
              <Icons.google className="w-6 h-6" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
