import { Navigation } from "@/components/layouts/navigation";
import { RoomList } from "@/components/room-list";
import { siteConfig } from "@/config/site";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Navigation items={siteConfig.navItem} />
      <main className="flex w-full flex-col overflow-hidden">{children}</main>
    </div>
  );
}
