import { SetMetadata } from '@nestjs/common';

// Mark a route as public — JwtAuthGuard will skip token verification for it.
// Use on login, register, and any route a guest can access.
//
// Usage:
//   @Public()
//   @Post('login')
//   login(@Body() dto: LoginDto) { ... }

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);