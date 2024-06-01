import { Request, Response } from "express";
import { SendMessageUseCase } from "../use-cases/message/SendMessageUseCase";

export class MessageController {
  constructor(private sendMessageUseCase: SendMessageUseCase) {}

  async handleSendMessage(request: Request, response: Response): Promise<Response> {
    const { senderId, receiverId, content } = request.body;

    try {
      await this.sendMessageUseCase.execute({ senderId, receiverId, content });
      return response.status(201).send();
    } catch (err) {
      return response.status(400).json({ message: (err as any).message });
    }
  }
}
