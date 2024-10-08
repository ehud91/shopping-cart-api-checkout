import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi'; // For validation (optional)
import * as dotenv from 'dotenv';

dotenv.config();  // Load environment variables from .env file
const _PORT = process.env.APP_PORT || 3000;

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true, // Make the ConfigModule global
      envFilePath: '.env', // Path to your .env file
      validationSchema: Joi.object({
        APP_PORT: _PORT,
        DB_HOST: process.env.MONGO_CONNECTION_STRING,
        DB_PORT: process.env.MONGO_CONNECTION_PORT,
        ALLOW_MAX_REQUESTS: process.env.ALLOW_MAX_REQUESTS,
        RATE_LIMITER_TIME_WINDOW: process.env.RATE_LIMITER_TIME_WINDOW,
        JWT_SECRET: process.env.JWT_SECRET,
        JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
        JWT_ALGORITHM: process.env.JWT_ALGORITHM
      }),
    }),
  ],
  exports: [NestConfigModule],
})
export class ConfigModule {}