import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle('Authentication Service')
		.setDescription(
			'This service is a base platform designed to authenticate users',
		)
		.setVersion('1.1')
		.addApiKey({ type: 'apiKey', name: 'Api-Key', in: 'header' }, 'Api-Key')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('swagger', app, document);

	app.useGlobalPipes(new ValidationPipe());
	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
