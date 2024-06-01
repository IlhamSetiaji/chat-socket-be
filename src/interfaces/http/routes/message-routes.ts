import { Request, Response, Router } from "express";
import { MessageFactory } from "../../../factories/MessageFactory";

const messageRoutes = Router();
const messageController = MessageFactory.makeMessageController();

messageRoutes.post("/send-message", (req: Request, res: Response) =>
  messageController.handleSendMessage(req, res)
);

export { messageRoutes };
