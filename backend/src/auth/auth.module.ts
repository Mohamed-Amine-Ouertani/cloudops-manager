import { Module } from '@nestjs/common';
import { JwtModule }     from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD }     from '@nestjs/core';

import { AuthService }    from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { JwtStrategy }    from './strategies/jwt.strategy.js';
import { JwtAuthGuard }   from './guards/jwt-auth.guard.js';
import { RolesGuard }     from './guards/roles.guard.js';
import { UsersModule }    from '../users/users.module.js';

@Module({
  imports: [
    UsersModule,       // AuthService needs UsersService.findByEmail()
    PassportModule,
    JwtModule.register({
      secret:      process.env.JWT_SECRET ?? 'change-me',
      signOptions: { expiresIn: (process.env.JWT_EXPIRES_IN ?? '7d') as any },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,

    // APP_GUARD registers guards GLOBALLY — every route is protected by default.
    // Order matters: JwtAuthGuard runs first, then RolesGuard.
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
  exports: [AuthService],
})
export class AuthModule {}