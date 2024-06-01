import { MessageController } from "../applications/controllers/MessageController";
import { SendMessageUseCase } from "../applications/use-cases/message/SendMessageUseCase";
import { MessageRepositoryImpl } from "../domains/repositories/message/MessageRepositoryImpl";

export class MessageFactory {
  static makeMessageController(): MessageController {
    // repositories
    const messageRepository = new MessageRepositoryImpl();

    // use cases
    const sendMessageUseCase = new SendMessageUseCase(messageRepository);

    // controllers
    const messageController = new MessageController(sendMessageUseCase);
    return messageController;
  }
}
