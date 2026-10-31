import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { CreateUserDto } from '../src/users/dto/create-user.dto.js';
export declare class AuthController {
    private readonly svc;
    constructor(svc: AuthService);
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
    me(user: any): any;
}
