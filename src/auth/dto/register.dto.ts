import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, MaxLength } from 'class-validator'

export class RegisterDto {
	@IsEmail({}, { message: 'Invalid email' })
	@IsNotEmpty()
	email: string

	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	@MaxLength(50)
	username: string

	@IsString()
	@IsNotEmpty()
	@MinLength(6)
	password: string

	@IsString()
	@IsOptional()
	@MaxLength(100)
	firstName?: string

	@IsString()
	@IsOptional()
	@MaxLength(100)
	lastName?: string
}
