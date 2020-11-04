import {ENV} from './env'

export enum NodeEnv {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
}

export type LoggerLevel = 'dev' | 'prod'

interface IConfig {
  env: NodeEnv
  cert: string
  key: string
  server: {
    host: string
    port: number
  }
  db: {
    url: string
  }
  logger: {
    level: LoggerLevel
  }
  jwt: {
    secret: string
  }
}

export const Config: IConfig = {
  env: (process.env.NODE_ENV as NodeEnv) || ENV.NODE_ENV,
  cert: process.env.SSL_CERT || ENV.SSL_CERT,
  key: process.env.SSL_KEY || ENV.SSL_KEY,
  server: {
    host: process.env.HOST || ENV.SERVER_HOST,
    port: Number(process.env.PORT) || ENV.SERVER_PORT,
  },
  db: {
    url: process.env.DB_URL_MAIN || ENV.DB_URL,
  },
  logger: {
    level: (process.env.LOG_LEVEL as LoggerLevel) || ENV.LOG_LEVEL,
  },
  jwt: {
    secret: ENV.JWT_SECRET,
  },
}
