import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { discordFailureUrl, nestjsPort } from './env/envoriment';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { sendDiscordMessage } from './utils/discord.util';

const isProd = process.env.NODE_ENV === 'production';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Bank Api')
    .setDescription(
      'The Bank API description using NestJS, Swagger, Docker and Prisma',
    )
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .setBasePath('api')
    .addSecurityRequirements('bearer')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, {
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
    ],
  });
 
  await app.listen(nestjsPort, () => {
    console.log(`Server running on port http://localhost:${nestjsPort}/api`);
  });
}
bootstrap().catch(async (err) => {
  new Logger('main.ts').error(err);
  const url = discordFailureUrl;
  const msg = typeof err?.message === 'string' ? err.message : '';

  await sendDiscordMessage(
    url,
    `Aplicação Falhou ao Iniciar: ${msg}\nSinto Muito ( u.u)`,
    isProd,
    false,
  );
  if (isProd) await new Promise((r) => setTimeout(r, 3600_000));
  else throw err;
});
