import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService }   from './auth.service.js';
import { LoginDto }      from './dto/login.dto.js';
import { CreateUserDto } from '../users/dto/create-user.dto.js';
import { Public }        from './decorators/public.decorator.js';
import { CurrentUser }   from './decorators/current-user.decorator.js';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly svc: AuthService) {}

  // @Public() disables JwtAuthGuard for this route — no token needed
  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Create an account → returns JWT' })
  register(@Body() dto: CreateUserDto) { return this.svc.register(dto); }

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Sign in → returns JWT' })
  login(@Body() dto: LoginDto) { return this.svc.login(dto); }

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Return the currently authenticated user' })
  me(@CurrentUser() user: any) { return user; }
}