import { NextFunction, Request, Response } from "express";

export function LoggerMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  console.info({
    body: request.body,
    method: request.method,
    url: request.url,
    query: request.query,
    params: request.params,
    date: new Date(),
  });
  next();
}
