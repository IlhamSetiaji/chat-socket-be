import { prisma } from "../../../infrastructures/database/prisma-client";
import { Message } from "../../entities/Message";
import { IMessageRepository } from "./IMessageRepository";

export class MessageRepositoryImpl implements IMessageRepository {
  async send(
    senderId: string,
    receiverId: string,
    content: string
  ): Promise<Message> {
    return prisma.message.create({
      data: {
        senderId,
        receiverId,
        content,
      },
    });
  }

  async receive(userId: string): Promise<Message[]> {
    return prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: userId,
          },
          {
            receiverId: userId,
          },
        ],
      },
    });
  }
}
