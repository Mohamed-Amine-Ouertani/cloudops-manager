import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service.js';
import { LoginDto } from './dto/login.dto.js';
import { CreateUserDto } from '../users/dto/create-user.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwt:   JwtService,
  ) {}

  // Register → create user → return token immediately (no extra login step)
  async register(dto: CreateUserDto) {
    const user = await this.users.create(dto);
    return this.sign(user as any);
  }

  async login(dto: LoginDto) {
    // findByEmail returns the raw row including passwordHash
    const user = await this.users.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    return this.sign(user);
  }

  // Package the user identity into a signed JWT
  private sign(user: { id: string; email: string; role: string }) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwt.sign(payload),
      expires_in:   '7d',
      user: { id: user.id, email: user.email, role: user.role },
    };
  }
}