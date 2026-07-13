import { authUserId } from "@/app/(auth)/middleware";
import { fetchChatMessages } from "@/app/dashboard/chatMessages/actions";
import { ChatMessage, UserProfile } from "@/generated/prisma/client/client";
import { notFound } from "next/navigation";
import ChatPage from "./Chat";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) {
    return notFound();
  }

  const { data } = await fetchChatMessages(id);
  const currentUserId = await authUserId();

  return (
    <ChatPage
      messages={data as (ChatMessage & { sender: { profile: UserProfile } })[]}
      currentUserId={currentUserId as string}
    />
  );
}
