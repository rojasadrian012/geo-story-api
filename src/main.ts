import { NestFactory } from '@nestjs/core';
import { Logger, Options, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('BoostrapIn')


  app.setGlobalPrefix('api')

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  // Configuración de CORS
  app.enableCors(
    // {
    //   origin: '*', // O coloca aquí tus dominios permitidos, por ejemplo: ['http://localhost:4200']
    //   methods: 'GET,PUT,PATCH,POST,DELETE',
    //   credentials: true,
    // }
  );
  const config = new DocumentBuilder()
    .setTitle('ZenApp RESTful API')
    .setDescription('ZenApp endpoints')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
  logger.log('App en el puerto:' + process.env.PORT);

}
bootstrap();
