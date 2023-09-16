import { Chat } from "@/components/chat/chat";
import { RoomList } from "@/components/room-list";
import { getAuthSession } from "@/lib/auth";
import db from "@/lib/db";

export default async function HomePage({
  searchParams,
}: {
  searchParams: { profileId: string };
}) {
  const session = await getAuthSession();
  const user = await db.user.findFirst({
    where: {
      id: session?.user.id,
    },
  });

  const otherUser = await db.user.findFirst({
    where: {
      id: searchParams.profileId,
    },
  });

  return (
    <div className="flex">
      <RoomList title="Global" roomUrl="/global" />
      <Chat
        apiUrl="/api/global"
        socketUrl="/api/socket/global"
        addKey="chat:global:messages"
        updateKey="chat:global:messages:update"
        queryKey="global"
        title="Global"
        user={user}
        image="/global.png"
        params={searchParams.profileId}
        url="/"
        otherUser={otherUser}
      />
    </div>
  );
}
