import { getAuthSession } from "@/lib/auth";
import db from "@/lib/db";
import { redirect } from "next/navigation";

export async function currentUser() {
  const session = await getAuthSession();
  if (!session) {
    redirect("/sign-in")
  }
  const userId = session?.user.id;

  const currentUser = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  return currentUser;
}
