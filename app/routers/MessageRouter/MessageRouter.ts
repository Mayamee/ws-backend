import { Router } from 'express'
import { MessageController } from '@/controllers'

const MessageRouter = Router()

MessageRouter.get('/polling', MessageController.pollMessages)
MessageRouter.get('/', MessageController.getMessages)
MessageRouter.post('/', MessageController.postMessageWithPolling)

export { MessageRouter }
