import { IsString, IsNotEmpty, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
	@ApiProperty({
		example: 'john_doe',
		description: 'Имя пользователя или email',
		required: true,
	})
	@IsString()
	@IsNotEmpty()
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
}
