import { Injectable } from '@nestjs/common'
import * as crypto from 'crypto'
import { PrismaService } from '../../prisma/prisma.service.js'

@Injectable()
export class SessionsService {
	constructor(private prisma: PrismaService) {}

	private hashToken(token: string): string {
		return crypto.createHash('sha256').update(token).digest('hex')
	}

	async create(data: {
		userId: string
		refreshToken: string
		refreshTokenExpiresAt: Date
		userAgent?: string
		ipAddress?: string
	}) {
		return this.prisma.session.create({
			data: {
				userId: data.userId,
				refreshToken: this.hashToken(data.refreshToken),
				refreshTokenExpiresAt: data.refreshTokenExpiresAt,
				userAgent: data.userAgent,
				ipAddress: data.ipAddress,
				expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 min
			},
		})
	}

	async findByRefreshToken(refreshToken: string) {
		return this.prisma.session.findUnique({
			where: {
				refreshToken: this.hashToken(refreshToken),
				revokedAt: null,
			},
			include: { user: true },
		})
	}

	async deleteByUserId(userId: string) {
		return this.prisma.session.deleteMany({
			where: { userId },
		})
	}
}
