"use server";

import {
  authActionWrapper,
  createdResponse,
  forbiddenError,
  okResponse,
} from "@/lib/responses";
import { prisma } from "@/prisma/prisma";
import { authUserId } from "../(auth)/middleware";

export const createChatRoom = authActionWrapper(async (recipientId: string) => {
  const userId = await authUserId();
  if (!userId) {
    return forbiddenError();
  }

  const chatRoom = await prisma.chatRoom.create({
    data: { buyerId: userId as string, sellerId: recipientId },
  });

  return createdResponse("Chat created successfully", chatRoom.id);
});

export const createListingChatRoom = authActionWrapper(
  async (listingId: string, sellerId: string) => {
    const userId = await authUserId();
    if (!userId) {
      return forbiddenError();
    }

    if (userId === sellerId) {
      return forbiddenError();
    }

    const chatRoom = await prisma.chatRoom.create({
      data: {
        buyerId: userId as string,
        sellerId,
        listingId,
      },
    });

    return createdResponse("Chat created successfully", chatRoom.id);
  },
);

export const fetchChatRoomById = authActionWrapper(async (id: string) => {
  const userId = await authUserId();
  if (!userId) {
    return forbiddenError();
  }

  const chatRoom = await prisma.chatRoom.findUnique({
    where: { id },
  });

  return okResponse("Chat found successfully", chatRoom);
});

export const fetchListingChatRoom = authActionWrapper(
  async (listingId: string, sellerId: string) => {
    const userId = await authUserId();
    if (!userId) {
      return forbiddenError();
    }

    const chatRoom = await prisma.chatRoom.findUnique({
      where: {
        buyerId_sellerId_listingId: {
          buyerId: userId as string,
          sellerId,
          listingId,
        },
      },
    });

    return okResponse("Chat found successfully", chatRoom);
  },
);
