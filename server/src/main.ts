import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: 'GET,PUT,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
