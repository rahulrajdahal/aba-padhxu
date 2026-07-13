"use server";

import { authUserId } from "@/app/(auth)/middleware";
import {
  authActionWrapper,
  createdResponse,
  forbiddenError,
  okResponse,
  validationError,
} from "@/lib/responses";
import { prisma } from "@/prisma/prisma";
import { routes } from "@/utils/routes";
import { revalidatePath } from "next/cache";
import { addChatMessageSchema } from "./chatMessages.validation";

export const fetchChatMessages = authActionWrapper(
  async (chatRoomId: string) => {
    const userId = await authUserId();
    if (!userId) {
      return forbiddenError();
    }

    const chatMessages = await prisma.chatMessage.findMany({
      where: { chatRoomId },
      include: {
        sender: {
          select: {
            profile: {
              select: { firstName: true, lastName: true, avatar: true },
            },
          },
        },
      },
    });

    return okResponse("Chat Message sent successfully.", chatMessages);
  },
);

export const sendMessage = authActionWrapper(
  async (prevState: unknown, formData: FormData) => {
    const ws = new WebSocket("ws://localhost:3000");

    ws.onopen = () => {
      ws.send("Hello Server");
    };

    const userId = await authUserId();
    if (!userId) {
      return forbiddenError();
    }

    const body = {
      chatRoomId: formData.get("chatRoomId") as string,
      senderId: userId as string,
      messageText: formData.get("messageText") as string,
    };

    const validateBody = addChatMessageSchema.safeParse(body);
    if (!validateBody.success) {
      return validationError(validateBody.error.flatten().fieldErrors);
    }

    const chatMessage = await prisma.chatMessage.create({ data: body });

    revalidatePath(`${routes.messages}/${body.chatRoomId}`);
    return createdResponse("Chat Message sent successfully.", chatMessage.id);
  },
);
