import { NextFunction, Request, Response } from 'express'
import { FSService } from '@/services'
import { FSServicePaths } from '@/constants'
import { getLogMessage } from './utils'

const fileService = new FSService(FSServicePaths.LOGS)

export function LoggerMiddleware(request: Request, response: Response, next: NextFunction): void {
  const logMessage = getLogMessage(request, response)
  console.info(logMessage)
  fileService.saveFileContent('access.log', logMessage + '\n', true)

  next()
}
