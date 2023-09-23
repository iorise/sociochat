import { redirect } from "next/navigation";

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
  if (!session) {
    redirect("/sign-in");
  }
  const user = await db.user.findFirst({
    where: {
      id: session.user.id,
    },
  });

  const otherUser = await db.user.findFirst({
    where: {
      id: searchParams.profileId,
    },
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[190px_minmax(0,1fr)] md:grid-cols-[260px_minmax(0,1fr)]">
      <RoomList
        title="Global"
        roomUrl="/global"
        global
      />
      <Chat
        apiUrl="/api/global"
        socketUrl="/api/socket/global"
        addKey="chat:global:messages"
        updateKey="chat:global:messages:update"
        queryKey="global"
        title="Global"
        user={user}
        image="/global.png"
        profileIdParams={searchParams.profileId}
        profileUrl={`/`}
        otherUser={otherUser}
      />
    </div>
  );
}
