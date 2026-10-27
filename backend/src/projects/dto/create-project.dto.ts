import { IsString, IsEnum, IsUUID, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Environment, ProjectStatus } from '@prisma/client';

export class CreateProjectDto {
  @ApiProperty({ example: 'E-Commerce Platform' })
  @IsString() @MaxLength(100)
  name: string;

  @ApiPropertyOptional()
  @IsString() @IsOptional()
  description?: string;

  @ApiPropertyOptional({ enum: Environment, default: 'DEVELOPMENT' })
  @IsEnum(Environment) @IsOptional()
  environment?: Environment;

  @ApiPropertyOptional({ enum: ProjectStatus, default: 'ACTIVE' })
  @IsEnum(ProjectStatus) @IsOptional()
  status?: ProjectStatus;

  @ApiProperty()
  @IsUUID()
  teamId: string;
}