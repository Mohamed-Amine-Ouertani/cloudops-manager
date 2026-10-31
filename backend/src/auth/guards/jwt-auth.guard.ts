import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator.js';

// This guard runs FIRST on every request.
// It checks the @Public() decorator — if present, it skips token verification.
// Otherwise it calls the JwtStrategy.validate() and populates req.user.
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) { super(); }

  canActivate(ctx: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      ctx.getHandler(),  // method-level decorator wins
      ctx.getClass(),    // class-level decorator is fallback
    ]);
    if (isPublic) return true;         // @Public() → skip auth
    return super.canActivate(ctx);    // verify JWT
  }
}