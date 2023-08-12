import 'module-alias/register'; // path aliases
import express from "express";
import cors from "cors";

import { CatchErrorMiddleware } from "@/middlewares";
import { LoggerMiddleware } from "@/middlewares";
import { MessageRouter } from "@/routers";
import { Routes } from "@/constants";

const PORT = 8080;
const app = express();

app.use(
  cors({
    origin: "*",
    allowedHeaders: "*",
    methods: "*",
  })
);

app.use(express.json());
app.use(LoggerMiddleware);

app.use(Routes.MESSAGES, MessageRouter);

app.use(CatchErrorMiddleware);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
