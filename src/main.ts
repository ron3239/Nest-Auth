// src/main.ts
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module.js'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	// Подключаем .env
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true, // Автоматически удаляет поля, которых нет в DTO
			forbidNonWhitelisted: true, // Ошибается, если прислали лишнее
			transform: true, // Преобразует типы (например, string -> number)
		})
	)

	// Включаем CORS (для фронтенда)
	app.enableCors()

	// Настройка Swagger (документация)
	const config = new DocumentBuilder()
		.setTitle('Auth API')
		.setDescription('Система аутентификации')
		.setVersion('1.0')
		.addBearerAuth() // Кнопка для ввода токена
		.build()

	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('api', app, document)

	const port = process.env.PORT || 3000
	await app.listen(port)
	console.log(`🚀 Приложение запущено: http://localhost:${port}`)
	console.log(`📚 Swagger документация: http://localhost:${port}/api`)
}
bootstrap()
