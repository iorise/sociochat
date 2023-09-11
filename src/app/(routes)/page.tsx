import { getAuthSession } from "@/lib/auth";

export default async function HomePage() {
  const session = await getAuthSession();
  console.log(session);
  return <div>HomePage</div>;
}
