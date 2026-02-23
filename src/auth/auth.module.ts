import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "../auth/auth.controller.js";
import { AuthService } from "../auth/auth.service.js";
import { UsersModule } from "../users/users.module.js";
import { SessionsModule } from "./sessions/sessions.module.js";
import { TokenModule } from "./token/token.module.js";
import { JwtStrategy } from "./strategies/jwt.strategy.js";

@Module({
  imports: [UsersModule, SessionsModule, TokenModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
