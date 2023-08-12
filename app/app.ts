import express from "express";
import cors from "cors";

import { CatchErrorMiddleware } from "./middlewares";
import { MessageController } from "./controllers";
import { LoggerMiddleware } from "./middlewares/LoggerMiddleware/LoggerMiddleware";

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

app
  .get("/chat/polling", MessageController.getMessagesPolling)
  .post("/chat/polling", MessageController.postMessagePolling);

app.use(CatchErrorMiddleware);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
