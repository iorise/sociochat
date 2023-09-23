import { Navigation } from "@/components/layouts/navigation";
import { siteConfig } from "@/config/site";
import { currentUser } from "@/lib/current-user";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  return (
    <div className="flex md:grid md:grid-cols-[5rem_minmax(0,1fr)]">
      <Navigation items={siteConfig.navItem} image={user.image} />
      <main className="flex w-full flex-col overflow-hidden">{children}</main>
    </div>
  );
}
