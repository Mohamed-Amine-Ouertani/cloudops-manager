import {
  IsString, IsEnum, IsIP, IsInt, IsUUID, IsOptional, Min, MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Provider, ServerStatus } from '@prisma/client';

export class CreateServerDto {
  @ApiProperty({ example: 'prod-web-01' })
  @IsString() @MaxLength(100)
  name: string;

  @ApiProperty({ enum: Provider })
  @IsEnum(Provider)
  provider: Provider;

  @ApiProperty({ example: 'eu-west-1' })
  @IsString()
  region: string;

  @ApiProperty({ example: '54.12.34.56' })
  @IsIP()
  ipAddress: string;

  @ApiProperty({ example: 4, description: 'vCPU cores' })
  @IsInt() @Min(1)
  cpu: number;

  @ApiProperty({ example: 16, description: 'RAM in GB' })
  @IsInt() @Min(1)
  ram: number;

  @ApiProperty({ example: 200, description: 'Storage in GB' })
  @IsInt() @Min(1)
  storage: number;

  @ApiPropertyOptional({ enum: ServerStatus, default: 'OFFLINE' })
  @IsEnum(ServerStatus) @IsOptional()
  status?: ServerStatus;

  @ApiProperty()
  @IsUUID()
  projectId: string;
}