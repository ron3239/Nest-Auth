import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: { email: string; username: string; password: string; firstName?: string; lastName?: string }) {
		return this.prisma.user.create({ data })
	}

	async findByEmail(email: string) {
		return this.prisma.user.findUnique({
			where: { email },
		})
	}

	async findByUsername(username: string) {
		return this.prisma.user.findUnique({
			where: { username },
		})
	}

	async findById(id: string) {
		return this.prisma.user.findUnique({
			where: { id },
		})
	}
}
