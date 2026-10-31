import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'admin@cloudops.dev' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'StrongPass1!' })
  @IsString() @MinLength(8)
  password: string;
}
