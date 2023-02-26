import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  app.enableCors();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
