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
    <div className="flex">
      <Navigation items={siteConfig.navItem} image={user.image} />
      <main className="flex w-full flex-col overflow-hidden">{children}</main>
    </div>
  );
}
