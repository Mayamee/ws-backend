import { NextFunction, Request, Response } from "express";
import { ResponseStatus } from "@/constants";
import { ApiError } from "@/utils";

export function CatchErrorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      message: err.message,
    });
  }
  res.status(ResponseStatus.INTERNAL_SERVER_ERROR).json({
    message: "Internal server error",
  });
}
