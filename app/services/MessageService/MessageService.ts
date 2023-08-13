import { v4 as uuid } from "uuid";
import { FSService } from "./../FSService";
import { FSServicePaths } from "@/constants";

export type Message = {
  id: string;
  content: string;
};

type MessageData = {
  messages: Message[];
};

enum MessageServiceState {
  initializing = "initializing",
  ready = "ready",
}

class MessageService {
  private messages: Message[] = [];
  private state: MessageServiceState = MessageServiceState.initializing;
  constructor(private fileService: FSService) {
    this.loadMessages().then((data) => {
      this.messages = data.messages;
      this.state = MessageServiceState.ready;
    });
  }

  private loadMessages = async () => {
    const data = await this.fileService.getFileContent("messages.json");
    if (data.length === 0) {
      return { messages: [] };
    }
    return JSON.parse(data) as MessageData;
  };
  private saveMessages = async (data: MessageData) => {
    return this.fileService.saveFileContent(
      "messages.json",
      JSON.stringify(data)
    );
  };
  private waitForReadyState = async () => {
    if (this.state === MessageServiceState.initializing) {
      await new Promise<void>((resolve) => {
        const interval = setInterval(() => {
          if (this.state === MessageServiceState.ready) {
            clearInterval(interval);
            resolve();
          }
        }, 100);
      });
    }
  };

  public getMessages = async () => {
    await this.waitForReadyState();
    return this.messages;
  };
  public getMessage = async (id: string) => {
    await this.waitForReadyState();
    return this.messages.find((message) => message.id === id);
  };
  public addMessage = async (messageContent: string): Promise<Message> => {
    const newMessage: Message = {
      id: uuid(),
      content: messageContent,
    };
    this.messages.push(newMessage);
    await this.saveMessages({ messages: this.messages });
    return newMessage;
  };

  public deleteMessage = async (id: string): Promise<void> => {
    await this.waitForReadyState();
    this.messages = this.messages.filter((message) => message.id !== id);
    await this.saveMessages({ messages: this.messages });
  };

  public updateMessage = async (message: Message): Promise<void> => {
    await this.waitForReadyState();
    this.messages = this.messages.map((m) =>
      m.id === message.id ? message : m
    );
    await this.saveMessages({ messages: this.messages });
  };
  get currentState(): MessageServiceState {
    return this.state;
  }
}

const messageService = new MessageService(
  new FSService(FSServicePaths.MESSAGES)
);

export { messageService as MessageService };
