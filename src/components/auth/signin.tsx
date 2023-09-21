"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { SignInForm } from "@/components/form/signin-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { Shell } from "@/components/shell";
import { setTransition } from "@/lib/transition";

export function SignIn() {
  return (
    <motion.div
      {...setTransition({
        duration: 0.2,
      })}
    >
      <Shell
        as="div"
        className="w-full flex items-center justify-center h-screen"
      >
        <Card className="w-[28rem]">
          <CardHeader>Log in to {siteConfig.name}</CardHeader>
          <CardContent>
            <SignInForm />
          </CardContent>
          <CardFooter>
            <p className="text-muted-foreground">
              Not registered?{" "}
              <span className="hover:border-b hover:border-primary hover:text-primary transition-all">
                <Link href="/sign-up" className="">
                  Sign up
                </Link>
              </span>
            </p>
          </CardFooter>
        </Card>
      </Shell>
    </motion.div>
  );
}
