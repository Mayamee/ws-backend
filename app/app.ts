import "module-alias/register"; // path aliases
import express from "express";
import cors from "cors";

import { CatchErrorMiddleware } from "@/middlewares";
import { LoggerMiddleware } from "@/middlewares";
import { MessageRouter } from "@/routers";
import { Routes } from "@/constants";
import { EnvironmentService } from "@/services";

const app = express();
const { PORT, HOST, CORS_OPTIONS } = EnvironmentService.currentConfig;

app.use(cors(CORS_OPTIONS));

app.use(express.json());
app.use(LoggerMiddleware);

app.use(Routes.MESSAGES, MessageRouter);

app.use(CatchErrorMiddleware);

app.listen(PORT, HOST, () => {
  console.log(`Server started on port ${PORT}`);
});
