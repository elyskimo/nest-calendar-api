import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
config();

import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
