import path from "path";

export const ROOT_DIR = path.join(__dirname, "..");
export const ROOT_CONTENT_DIR = path.join(ROOT_DIR, "content");
export enum ResponseStatus {
  SUCCESS = 200,
  CREATED = 201,
  INTERNAL_SERVER_ERROR = 500,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
}

export enum Routes {
  MESSAGES = "/api/v1/chat/messages",
}

export enum FSServicePaths {
  LOGS = "logs",
  MESSAGES = "messages",
}
