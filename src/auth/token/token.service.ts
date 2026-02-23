import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as crypto from 'crypto'

@Injectable()
export class TokenService {
	constructor(private jwtService: JwtService) {}

	public async generateTokens(user: any) {
		const payload = { sub: user.id, email: user.email }

		const accessToken = await this.jwtService.signAsync(payload, {
			expiresIn: '15m',
		})

		const refreshToken = crypto.randomBytes(32).toString('hex')

		return {
			accessToken,
			refreshToken,
			expiresIn: '15m',
		}
	}
}
