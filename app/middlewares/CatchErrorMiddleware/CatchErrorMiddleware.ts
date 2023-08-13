import { NextFunction, Request, Response } from "express";
import { FSServicePaths, ResponseStatus } from "@/constants";
import { ApiError } from "@/utils";
import { FSService } from "@/services";
import { getLogErrorMessage } from "./utils";

const fileService = new FSService(FSServicePaths.LOGS);

export function CatchErrorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  fileService.saveFileContent(
    "error.log",
    getLogErrorMessage(err) + "\n",
    true
  );
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      message: err.message,
    });
  }
  res.status(ResponseStatus.INTERNAL_SERVER_ERROR).json({
    message: "Internal server error",
  });
}
