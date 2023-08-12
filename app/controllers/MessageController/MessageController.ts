import { NextFunction, Request, Response } from "express";
import { MessageService } from "../../services/MessageService";
import { ResponseStatus } from "../../constants";
import { ApiError } from "../../utils";

class MessageController {
  public getMessagesPolling = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const messages = await MessageService.getMessages();
      res.status(ResponseStatus.SUCCESS).json(messages);
    } catch (err) {
      next(err);
    }
  };
  public postMessagePolling = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const messageBody = (req.body.content || "") as string;
      //TODO Валидация в Middleware

      if (messageBody.length === 0) {
        throw ApiError.BadRequest("Message content cannot be empty");
      }

      const message = await MessageService.addMessage(messageBody);
      res.status(ResponseStatus.CREATED).json(message);
    } catch (err) {
      next(err);
    }
  };
}

const messageController = new MessageController();
export { messageController as MessageController };
