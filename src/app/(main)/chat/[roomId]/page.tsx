import { redirect } from "next/navigation";

import { Chat } from "@/components/chat/chat";
import { getAuthSession } from "@/lib/auth";
import db from "@/lib/db";

export default async function RoomChat({
  params,
  searchParams,
}: {
  params: { roomId: string };
  searchParams: { profileId: string };
}) {
  const session = await getAuthSession();
  if (!session) {
    redirect("/sign-in");
  }
  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    redirect("/sign-in");
  }

  const room = await db.room.findFirst({
    where: {
      id: params.roomId,
    },
    include: {
      members: true,
    },
  });

  if (!room) {
    return null;
  }

  const otherUser = room.members.find(
    (currentUser) => currentUser.id !== user.id
  );

  if (!otherUser) {
    return null;
  }
  return (
    <Chat
      apiUrl="/api/chat"
      socketUrl="/api/socket/chat"
      addKey={`chat:${params.roomId}:messages`}
      updateKey={`chat:${params.roomId}:messages:update`}
      queryKey={`chat:${params.roomId}:messages`}
      user={user}
      otherUser={otherUser}
      otherUserId={`?profileId=${otherUser.id}`}
      roomParams={params.roomId}
      profileUrl={`/chat/${params.roomId}`}
      profileIdParams={searchParams.profileId}
      title={otherUser?.name}
      image={otherUser?.image}
    />
  );
}
