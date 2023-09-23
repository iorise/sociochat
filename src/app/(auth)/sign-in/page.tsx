import { redirect } from "next/navigation";

import { getAuthSession } from "@/lib/auth";
import { SignIn } from "@/components/auth/signin";

export default async function SignInPage() {
  const session = await getAuthSession();
  if (session) redirect("/");

  return <SignIn />;
}
