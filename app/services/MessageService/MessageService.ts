import { FSService } from "../FSService";
import { v4 as uuid } from "uuid";

type Message = {
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

  public getMessages = async () => {
    if (this.state === MessageServiceState.initializing) {
      await new Promise((resolve) => {
        const interval = setInterval(() => {
          if (this.state === MessageServiceState.ready) {
            clearInterval(interval);
            resolve(this.messages);
          }
        }, 100);
      });
    }
    return this.messages;
  };
  public getMessage = async (id: string) => {
    if (this.state === MessageServiceState.initializing) {
      await new Promise((resolve) => {
        const interval = setInterval(() => {
          if (this.state === MessageServiceState.ready) {
            clearInterval(interval);
            resolve(this.messages.find((message) => message.id === id));
          }
        }, 100);
      });
    }
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
    this.messages = this.messages.filter((message) => message.id !== id);
    await this.saveMessages({ messages: this.messages });
  };

  public updateMessage = async (message: Message): Promise<void> => {
    this.messages = this.messages.map((m) =>
      m.id === message.id ? message : m
    );
    await this.saveMessages({ messages: this.messages });
  };
}

const messageService = new MessageService(new FSService("messages"));

export { messageService as MessageService };
