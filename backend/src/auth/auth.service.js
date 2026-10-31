var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../src/users/users.service.js';
let AuthService = class AuthService {
    users;
    jwt;
    constructor(users, jwt) {
        this.users = users;
        this.jwt = jwt;
    }
    async register(dto) {
        const user = await this.users.create(dto);
        return this.sign(user);
    }
    async login(dto) {
        const user = await this.users.findByEmail(dto.email);
        if (!user)
            throw new UnauthorizedException('Invalid credentials');
        const valid = await bcrypt.compare(dto.password, user.passwordHash);
        if (!valid)
            throw new UnauthorizedException('Invalid credentials');
        return this.sign(user);
    }
    sign(user) {
        const payload = { sub: user.id, email: user.email, role: user.role };
        return {
            access_token: this.jwt.sign(payload),
            expires_in: '7d',
            user: { id: user.id, email: user.email, role: user.role },
        };
    }
};
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [UsersService,
        JwtService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map