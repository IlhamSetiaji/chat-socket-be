import { Message } from "../../entities/Message";

export interface IMessageRepository {
  send(senderId: string, receiverId: string, content: string): Promise<Message>;
  receive(userId: string): Promise<Message[]>;
}
