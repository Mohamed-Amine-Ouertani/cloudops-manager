import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../src/users/users.service.js';
import { LoginDto } from './dto/login.dto.js';
import { CreateUserDto } from '../src/users/dto/create-user.dto.js';
export declare class AuthService {
    private readonly users;
    private readonly jwt;
    constructor(users: UsersService, jwt: JwtService);
    register(dto: CreateUserDto): Promise<{
        access_token: string;
        expires_in: string;
        user: {
            id: string;
            email: string;
            role: string;
        };
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
        expires_in: string;
        user: {
            id: string;
            email: string;
            role: string;
        };
    }>;
    private sign;
}
