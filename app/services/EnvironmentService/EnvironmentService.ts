import { CorsOptions } from 'cors'

type Environment = {
  HOST: string
  PORT: number
  NODE_ENV: 'development' | 'production'
  CORS_OPTIONS: CorsOptions
}

class EnvironmentService {
  constructor(source?: Record<string, string | undefined>) {
    this.loadConfig(source || process.env)
  }
  private config: Environment = {
    HOST: 'localhost',
    PORT: 8080,
    NODE_ENV: 'development',
    CORS_OPTIONS: {
      origin: 'http://localhost:8080',
      methods: 'GET, POST, PUT, DELETE, OPTIONS',
      allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      credentials: true,
    },
  }
  private loadConfig = (source: Record<string, string | undefined>) => {
    if (source.HOST) {
      this.config.HOST = source.HOST
    }
    if (source.PORT) {
      this.config.PORT = parseInt(source.PORT, 10)
    }
    if (source.NODE_ENV) {
      this.config.NODE_ENV = source.NODE_ENV as Environment['NODE_ENV']
    }
    // CORS
    if (source.ALLOW_ORIGINS) {
      this.config.CORS_OPTIONS.origin = source.ALLOW_ORIGINS.split(',')
    }
    if (source.ALLOW_METHODS) {
      this.config.CORS_OPTIONS.methods = source.ALLOW_METHODS
    }
    if (source.ALLOW_HEADERS) {
      this.config.CORS_OPTIONS.allowedHeaders = source.ALLOW_HEADERS
    }
    if (source.ALLOW_CREDENTIALS) {
      this.config.CORS_OPTIONS.credentials = source.ALLOW_CREDENTIALS === 'true'
    }
    // CORS
  }
  get currentConfig() {
    return this.config
  }
}

const environmentService = new EnvironmentService()

export { environmentService as EnvironmentService }
