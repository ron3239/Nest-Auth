import { ApiProperty } from '@nestjs/swagger'

export class UserResponseDto {
	@ApiProperty({ example: 1, description: 'ID пользователя' })
	id: number

	@ApiProperty({ example: 'user@example.com', description: 'Email' })
	email: string

	@ApiProperty({ example: 'john_doe', description: 'Имя пользователя' })
	username: string
}

export class TokensDto {
	@ApiProperty({
		example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
		description: 'JWT токен доступа (действителен 15 минут)',
	})
	access_token: string

	@ApiProperty({
		example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
		description: 'Refresh токен (действителен 7 дней)',
	})
	refresh_token: string
}

export class LoginResponseDto {
	@ApiProperty({ type: UserResponseDto, description: 'Информация о пользователе' })
	user: UserResponseDto

	@ApiProperty({ type: TokensDto, description: 'Токены доступа' })
	tokens: TokensDto
}

export class RegisterResponseDto {
	@ApiProperty({ example: 'Пользователь успешно зарегистрирован', description: 'Сообщение' })
	message: string

	@ApiProperty({ type: UserResponseDto, description: 'Информация о пользователе' })
	user: UserResponseDto
}
