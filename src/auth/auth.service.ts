import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { LoginDto } from "../auth/dto/login.dto.js";
import { RegisterDto } from "../auth/dto/register.dto.js";
import { UsersService } from "../users/users.service.js";
import * as bcrypt from "bcrypt";
import { SessionsService } from "../auth/sessions/sessions.service.js";
import { TokenService } from "../auth/token/token.service.js";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private sessionsService: SessionsService,
    private tokenService: TokenService,
  ) {}

  // РЕГИСТРАЦИЯ
  async register(dto: RegisterDto) {
    // Проверяем существует ли пользователь
    const existingUser = await this.usersService.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException("User already exists");
    }

    // Хэшируем пароль
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(dto.password, saltRounds);

    // Создаем пользователя
    const user = await this.usersService.create({
      email: dto.email,
      username: dto.username,
      password: passwordHash,
      firstName: dto.firstName,
      lastName: dto.lastName,
    });

    return {
      userId: user.id,
      email: user.email,
      message: "User registered successfully",
    };
  }

  // ЛОГИН
  async login(dto: LoginDto) {
    // Ищем пользователя
    const user = await this.usersService.findByUsername(dto.username);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    // Проверяем пароль
    const isValidPassword = await bcrypt.compare(dto.password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException("Invalid credentials");
    }

    // Генерируем токены
    const tokens = await this.tokenService.generateTokens(user);

    // Создаем сессию
    await this.sessionsService.create({
      userId: user.id,
      refreshToken: tokens.refreshToken,
      refreshTokenExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      tokens,
    };
  }

  // LOGOUT
  async logout(refreshToken: string) {
    const session = await this.sessionsService.findByRefreshToken(refreshToken);
    if (session) {
      await this.sessionsService.deleteByUserId(session.userId);
    }
    return { message: "Logged out" };
  }

  // REFRESH TOKENS
  async refreshTokens(refreshToken: string) {
    const session = await this.sessionsService.findByRefreshToken(refreshToken);

    if (!session) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    if (session.refreshTokenExpiresAt < new Date()) {
      await this.sessionsService.deleteByUserId(session.userId);
      throw new UnauthorizedException("Refresh token expired");
    }

    const user = await this.usersService.findById(session.userId);
    if (!user || !user.isActive) {
      throw new UnauthorizedException("User not found or inactive");
    }

    // Удаляем старую сессию
    await this.sessionsService.deleteByUserId(session.userId);

    // Генерируем новые токены
    const tokens = await this.tokenService.generateTokens(user);

    // Создаем новую сессию
    await this.sessionsService.create({
      userId: user.id,
      refreshToken: tokens.refreshToken,
      refreshTokenExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      tokens,
    };
  }
}
