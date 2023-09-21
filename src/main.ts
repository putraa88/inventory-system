import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
  Logger.log('Server running on port: 3000');
}
bootstrap();
