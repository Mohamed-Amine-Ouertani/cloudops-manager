import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Injects the authenticated user object into a controller parameter.
// The user object comes from JwtStrategy.validate() → { id, email, role }.
//
// Usage:
//   @Get('me')
//   me(@CurrentUser() user: { id: string; email: string; role: string }) {
//     return user;
//   }
//
//   // Extract a single field:
//   profile(@CurrentUser('id') userId: string) { ... }

export const CurrentUser = createParamDecorator(
  (field: string | undefined, ctx: ExecutionContext) => {
    const user = ctx.switchToHttp().getRequest().user;
    return field ? user?.[field] : user;
  },
);