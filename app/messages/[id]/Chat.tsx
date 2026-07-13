"use client";

import { sendMessage } from "@/app/dashboard/chatMessages/actions";
import { Button, Input } from "@/components";
import { ChatMessage, UserProfile } from "@/generated/prisma/client/client";
import { SendMessage } from "@meistericons/react";
import { useParams } from "next/navigation";
import { useActionState, useOptimistic } from "react";
import ChatBubble from "../components/ChatBubble";

interface ChatPageProps {
  messages: (ChatMessage & {
    sender: { profile: Pick<UserProfile, "firstName" | "lastName" | "avatar"> };
  })[];
  currentUserId: string;
}

export default function ChatPage({ messages, currentUserId }: ChatPageProps) {
  const { id } = useParams();

  const [optimisticMessages, setOptimisticMessages] = useOptimistic(
    messages,
    (messagesState, newMessage) => [
      ...messagesState,
      {
        chatRoomId: id as string,
        createdAt: new Date(),
        id: Math.random().toString(),
        messageText: String(newMessage),
        readAt: null,
        senderId: currentUserId,
        sender: {
          profile: {
            firstName: "",
            lastName: "",
            avatar: "",
          },
        },
      },
    ],
  );

  const handleChat = async (prevState: unknown, formData: FormData) => {
    formData.append("chatRoomId", id as string);

    const state = await sendMessage(prevState, formData);
    setOptimisticMessages(formData.get("messageText") as string);

    return state;
  };

  const [state, formAction, isPending] = useActionState(handleChat, null);

  return (
    <div className="max-w-md mx-auto my-10 p-4 border rounded-xl bg-white shadow-lg h-[500px] flex flex-col justify-between">
      {/* Chat History Container */}
      <div className="flex-1 overflow-y-auto pr-2">
        {optimisticMessages?.map((msg) => (
          <ChatBubble
            key={msg.id}
            message={msg.messageText}
            timestamp={msg.createdAt.toString()}
            isSender={msg.senderId === currentUserId}
            senderName={`${msg.sender.profile.firstName} ${msg.sender.profile.lastName}`}
          />
        ))}
      </div>

      <form action={formAction} className="mt-4 pt-2 border-t flex gap-2">
        <Input
          type="text"
          name="messageText"
          placeholder="Type a message..."
          errors={state?.errors?.messageText}
        />
        <Button
          isLoading={isPending}
          rightIcon={<SendMessage />}
          type="submit"
          size="sm"
        >
          {isPending ? "Sending..." : "Send"}
        </Button>
      </form>
    </div>
  );
}
