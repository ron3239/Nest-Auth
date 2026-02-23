// src/prisma/prisma.module.ts
import { Global, Module } from '@nestjs/common'
import { PrismaService } from './prisma.service.js'

@Global() // Делаем сервис глобально доступным
@Module({
	providers: [PrismaService],
	exports: [PrismaService],
})
export class PrismaModule {}
