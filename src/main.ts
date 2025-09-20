import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // Request logging middleware
  app.use((req, res, next) => {
    const { method, originalUrl, ip } = req;
    const userAgent = req.get('User-Agent') || '';
    const timestamp = new Date().toISOString();
    
    logger.log(`📥 ${method} ${originalUrl} - ${ip} - ${userAgent} - ${timestamp}`);
    
    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');
      logger.log(`📤 ${method} ${originalUrl} - ${statusCode} - ${contentLength || 0}b`);
    });
    
    next();
  });

  // Enable CORS for Flutter app
  app.enableCors({
    origin: true, // In production, specify your Flutter app's origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Set global prefix
  app.setGlobalPrefix('api/v1');

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('E-commerce API')
    .setDescription('E-commerce mobile app backend API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger documentation: http://localhost:${port}/api`);
}

bootstrap();
