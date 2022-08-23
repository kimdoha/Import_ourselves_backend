import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { 
  swaggerConfig, 
  swaggerCustomOptions 
} from './app.swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/docs', app, document, swaggerCustomOptions);

  app.enableCors({ 
    origin: ['http://kurlynurlybucket.s3-website.ap-northeast-2.amazonaws.com/'],
  });
  
  await app.listen(3000);
  console.info('Server is running on port 3000');

}
bootstrap();
