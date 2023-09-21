import { RoomList } from "@/components/room-list";
import { getAuthSession } from "@/lib/auth";
import db from "@/lib/db";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();

  const currentUser = await db.user.findFirst({
    where: {
      id: session?.user.id,
    },
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[190px_minmax(0,1fr)] md:grid-cols-[260px_minmax(0,1fr)]">
      <RoomList
        title="Messages"
        roomUrl="/chat"
        apiUrl="/api/rooms"
        queryKey="rooms"
        currentUser={currentUser}
      />
      <main>{children}</main>
    </div>
  );
}
