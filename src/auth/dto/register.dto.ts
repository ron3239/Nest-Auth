import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, MaxLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RegisterDto {
	@ApiProperty({
		example: 'user@example.com',
		description: 'Email пользователя',
		required: true,
	})
	@IsEmail({}, { message: 'Invalid email' })
	@IsNotEmpty()
	email: string

	@ApiProperty({
		example: 'john_doe',
		description: 'Имя пользователя (уникальное)',
		minLength: 3,
		maxLength: 50,
		required: true,
	})
	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	@MaxLength(50)
	username: string

	@ApiProperty({
		example: 'StrongPass123!',
		description: 'Пароль пользователя',
		minLength: 6,
		required: true,
	})
	@IsString()
	@IsNotEmpty()
	@MinLength(6)
	password: string

	@ApiProperty({
		example: 'John',
		description: 'Имя',
		maxLength: 100,
		required: false,
	})
	@IsString()
	@IsOptional()
	@MaxLength(100)
	firstName?: string

	@ApiProperty({
		example: 'Doe',
		description: 'Фамилия',
		maxLength: 100,
		required: false,
	})
	@IsString()
	@IsOptional()
	@MaxLength(100)
	lastName?: string
}
