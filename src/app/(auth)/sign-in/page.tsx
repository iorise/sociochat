import { redirect } from "next/navigation";

import { getAuthSession } from "@/lib/auth";
import { SignIn } from "@/components/signin";

export default async function SignInPage() {
  const session = await getAuthSession();
  if (session) redirect("/profile");

  return <SignIn />;
}
