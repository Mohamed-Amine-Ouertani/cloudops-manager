import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

// Restrict a route to one or more roles.
// If the user's role is not in the list, RolesGuard throws 403 Forbidden.
//
// Usage:
//   @Roles(Role.ADMIN)
//   @Delete(':id')
//   remove(...) { ... }
//
//   @Roles(Role.ADMIN, Role.DEVOPS)
//   @Post()
//   create(...) { ... }

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);