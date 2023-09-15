import { Chat } from "@/components/chat/chat";
import { getAuthSession } from "@/lib/auth";
import db from "@/lib/db";
import { redirect } from "next/navigation";

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
  const currentUser = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  const room = await db.room.findUnique({
    where: {
      id: params.roomId,
    },
    include: {
      members: true,
    },
  });

  const otherUser = await db.user.findFirst({
    where: {
      id: searchParams.profileId,
    },
  });
  return (
    <Chat
      apiUrl="/api/chat"
      queryKey="chat"
      user={currentUser}
      otherUser={otherUser}
      params={searchParams.profileId}
      url={`/chat/${params.roomId}`}
    />
  );
}
