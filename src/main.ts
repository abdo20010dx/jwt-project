import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { AuthGuard } from './auth/auth.gaurd';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  const config = new DocumentBuilder()
    // .addBearerAuth()
    .addSecurity('ApiKeyAuth', {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
    })
    .addSecurityRequirements('ApiKeyAuth')
    .setTitle('authentication example by Abdo Goma')
    .setDescription('The authentication API')
    .setVersion('1.0')
    .addTag('authentication')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  const reflector = app.get(Reflector);
  app.useGlobalGuards(new AuthGuard(reflector));

  await app.listen(process.env.PORT, '0.0.0.0', (err, address) => {
    console.log(err);
    console.log(address);

  });
}
bootstrap();