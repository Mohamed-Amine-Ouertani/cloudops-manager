import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto.js';

// Note: password field comes through as optional via PartialType.
// UsersService.update() handles re-hashing if it's provided.
export class UpdateUserDto extends PartialType(CreateUserDto) {}