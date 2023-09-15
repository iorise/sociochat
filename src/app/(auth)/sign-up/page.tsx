import { redirect } from "next/navigation";

import { getAuthSession } from "@/lib/auth";
import { SignUp } from "@/components/signup";

export default async function SignUpPage() {
  const session = await getAuthSession();
  if (session) redirect("/profile");

  return <SignUp />;
}