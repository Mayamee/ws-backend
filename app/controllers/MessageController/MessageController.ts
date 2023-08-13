import { NextFunction, Request, Response } from 'express'
import { LongPollingService, LongPollingServiceEvents } from '@/services/LongPollingService'
import { Message, MessageService } from '@/services/MessageService'
import { ResponseStatus } from '@/constants'
import { ApiError } from '@/utils'

class MessageController {
  public getMessages = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const messages = await MessageService.getMessages()
      res.status(ResponseStatus.SUCCESS).json(messages)
    } catch (err) {
      next(err)
    }
  }

  public postMessage = async (
    req: Request,
    res: Response,
    next: NextFunction,
    additionalAction?: (data: Message) => void
  ) => {
    try {
      const messageBody = (req.body.content || '') as string
      //TODO Валидация в Middleware
      if (messageBody.length === 0) {
        throw ApiError.BadRequest('Message content cannot be empty')
      }
      const message = await MessageService.addMessage(messageBody)

      additionalAction?.(message)

      res.status(ResponseStatus.CREATED).json(message)
    } catch (err) {
      next(err)
    }
  }

  public pollMessages = async (req: Request, res: Response, next: NextFunction) => {
    try {
      LongPollingService.onEvent(LongPollingServiceEvents.NEW_MESSAGE, (data) => {
        res.status(ResponseStatus.SUCCESS).json(data)
      })
    } catch (err) {
      next(err)
    }
  }
  public postMessageWithPolling = async (req: Request, res: Response, next: NextFunction) => {
    await this.postMessage(req, res, next, (message) => {
      LongPollingService.emitEvent(LongPollingServiceEvents.NEW_MESSAGE, message)
    })
  }
}

const messageController = new MessageController()
export { messageController as MessageController }
