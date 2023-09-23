"use client";

import { motion } from "framer-motion";

import { SignUpForm } from "@/components/form/signup-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Shell } from "@/components/shell";
import { setTransition } from "@/lib/transition";
import CustomLink from "@/components/custom-link";

export function SignUp() {
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
          <CardHeader>Sign up</CardHeader>
          <CardContent>
            <SignUpForm />
          </CardContent>
          <CardFooter>
            <p className="text-muted-foreground">
              Already registered?{" "}
              <CustomLink href="/sign-in" className="hover:text-primary">
                Sign in
              </CustomLink>
            </p>
          </CardFooter>
        </Card>
      </Shell>
    </motion.div>
  );
}
