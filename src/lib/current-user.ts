import { getAuthSession } from "@/lib/auth";
import db from "@/lib/db";

export async function currentUser() {
  const session = await getAuthSession();
  const userId = session?.user.id;

  const currentUser = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  return currentUser;
}
