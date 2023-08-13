import { Request, Response } from "express";

export const getLogMessage = (req: Request, _res: Response): string => {
  const logMessage = `${new Date().toLocaleString()} ${JSON.stringify({
    method: req.method,
    path: req.path,
    ip: req.ip,
    hostname: req.hostname,
    body: req.body,
    query: req.query,
    params: req.params,
    headers: req.headers,
    cookies: req.cookies,
  })}`;
  return logMessage;
};
