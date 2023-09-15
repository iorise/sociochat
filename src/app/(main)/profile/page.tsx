import { Profile } from "@/components/profile";
import { getAuthSession } from "@/lib/auth";
import db from "@/lib/db";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getAuthSession();
  if (!session?.user) redirect("/sign-in");

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) return null;

  return <Profile user={user} />;
}
