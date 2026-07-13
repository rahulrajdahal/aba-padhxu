import z from "zod";

export const addChatMessageSchema = z.object({
  chatRoomId: z.string().min(1, "Chat Room ID is required"),
  senderId: z.string().min(1, "Sender ID is required"),
  messageText: z.string().min(1, "Message is required"),
});
