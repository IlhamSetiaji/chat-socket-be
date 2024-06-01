import { IMessageRepository } from "../../../domains/repositories/message/IMessageRepository";
import { SendMessageDTO } from "../../data-transfer-objects/message/SendMessageDTO";
import amqp from 'amqplib';

export class SendMessageUseCase {
  constructor(private messageRepository: IMessageRepository) {}

  async execute(data: SendMessageDTO): Promise<void> {
    const message = await this.messageRepository.send(
      data.senderId,
      data.receiverId,
      data.content
    );

    const connection = await amqp.connect(process.env.RABBITMQ_URL ?? 'amqp://guest:guest@localhost:5672');
    const channel = await connection.createChannel();
    const queue = process.env.RABBITMQ_QUEUE ?? 'messages';

    await channel.assertQueue(queue, {
      durable: false,
    });

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));

    setTimeout(() => {
      connection.close();
    }, 500);
  }
}
