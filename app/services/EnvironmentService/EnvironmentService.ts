import { CorsOptions } from "cors";

type Environment = {
  HOST: string;
  PROTOCOL: "http" | "https";
  PORT: number;
  NODE_ENV: "development" | "production";
  CORS_OPTIONS: CorsOptions;
};

class EnvironmentService {
  constructor(source?: Record<string, string | undefined>) {
    this.loadConfig(source || process.env);
  }
  private config: Environment = {
    HOST: "localhost",
    PROTOCOL: "http",
    PORT: 8080,
    NODE_ENV: "development",
    CORS_OPTIONS: {
      origin: "http://localhost:8080",
      methods: "GET, POST, PUT, DELETE, OPTIONS",
      allowedHeaders:
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      credentials: true,
    },
  };
  private loadConfig = (env: Record<string, string | undefined>) => {
    if (env.HOST) {
      this.config.HOST = env.HOST;
    }
    if (env.PROTOCOL) {
      this.config.PROTOCOL = env.PROTOCOL as Environment["PROTOCOL"];
    }
    if (env.PORT) {
      this.config.PORT = parseInt(env.PORT, 10);
    }
    if (env.NODE_ENV) {
      this.config.NODE_ENV = env.NODE_ENV as Environment["NODE_ENV"];
    }
    // CORS
    if (env.ALLOW_ORIGINS) {
      this.config.CORS_OPTIONS.origin = env.ALLOW_ORIGINS.split(",");
    }
    if (env.ALLOW_METHODS) {
      this.config.CORS_OPTIONS.methods = env.ALLOW_METHODS;
    }
    if (env.ALLOW_HEADERS) {
      this.config.CORS_OPTIONS.allowedHeaders = env.ALLOW_HEADERS;
    }
    if (env.ALLOW_CREDENTIALS) {
      this.config.CORS_OPTIONS.credentials = env.ALLOW_CREDENTIALS === "true";
    }
    // CORS
  };
  get currentConfig() {
    return this.config;
  }
}

const environmentService = new EnvironmentService();

export { environmentService as EnvironmentService };
