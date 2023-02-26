import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // class validator 세팅
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      skipUndefinedProperties: true,
      stopAtFirstError: true,
    }),
  );

  // swagger 세팅
  const config = new DocumentBuilder()
    .setTitle('GoGreen Server')
    .setDescription('GoGreen API description')
    .setVersion('1.0')
    .addTag('GoGreen')
    .addBearerAuth()
    .build();

  await app.listen(3000);
}
bootstrap();
