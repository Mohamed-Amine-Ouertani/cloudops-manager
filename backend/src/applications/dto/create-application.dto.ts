import { IsString, IsEnum, IsUUID, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Environment, AppStatus } from '@prisma/client';

export class CreateApplicationDto {
  @ApiProperty({ example: 'api-gateway' })
  @IsString() @MaxLength(100)
  name: string;

  @ApiProperty({ example: '2.4.1' })
  @IsString() @MaxLength(50)
  version: string;

  @ApiProperty({ enum: Environment })
  @IsEnum(Environment)
  environment: Environment;

  @ApiPropertyOptional({ enum: AppStatus, default: 'STOPPED' })
  @IsEnum(AppStatus) @IsOptional()
  status?: AppStatus;

  @ApiProperty()
  @IsUUID()
  serverId: string;
}
// update-application.dto.ts → PartialType(CreateApplicationDto)
// applications.service.ts   → same CRUD pattern as ServersService
// applications.controller.ts → same pattern as TeamsController  +  @ApiTags('applications')
// applications.module.ts     → same pattern as TeamsModule