import { redirect } from "next/navigation";

import { getAuthSession } from "@/lib/auth";
import { SignUp } from "@/components/auth/signup";

export default async function SignUpPage() {
  const session = await getAuthSession();
  if (session) redirect("/");

  return <SignUp />;
}
