import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Calorie Calculator')
    .setDescription(
      '<p>An API for managing user accounts, tracking calorie intake, and searching product nutritional information. <br/>It enables users to register, log in, and maintain a personalized food diary with calorie tracking. <br/>This API is designed for health - conscious individuals looking to monitor their dietary habits effectively.</p> ',
    )
    .setVersion('1.0')
    .addTag('Calorie Calculator API')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3334);
}
bootstrap();
