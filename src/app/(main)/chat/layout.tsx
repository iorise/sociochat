import { RoomList } from "@/components/room-list";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex">
      <RoomList title="Messages" roomUrl="/chat"/>
      {children}
    </div>
  );
}
