import {
  IsEmail, IsString, IsEnum, IsUUID,
  MinLength, MaxLength, IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({ example: 'mohamed@cloudops.dev' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'StrongPass1!', description: 'Min 8 chars — hashed before storage' })
  @IsString() @MinLength(8)
  password: string;

  @ApiProperty({ example: 'Mohamed' })
  @IsString() @MaxLength(50)
  firstName: string;

  @ApiProperty({ example: 'Ben Ali' })
  @IsString() @MaxLength(50)
  lastName: string;

  @ApiPropertyOptional({ enum: Role, default: Role.VIEWER })
  @IsEnum(Role) @IsOptional()
  role?: Role;

  @ApiProperty({ description: 'UUID of the team this user belongs to' })
  @IsUUID()
  teamId: string;
}