import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerConfig } from './swagger/swaggerconfig.model';
import { SwaggerModule } from '@nestjs/swagger';

       

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe);
  const configService = app.get(ConfigService);
  const document = SwaggerModule.createDocument(app, SwaggerConfig);
  SwaggerModule.setup('api-info', app, document); 
  await app.listen(3001);
}
bootstrap();
