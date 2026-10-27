import {
  IsString, IsEnum, IsUUID, IsOptional,
  IsBoolean, IsNumber, Min, Max, MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MetricType, Severity } from '@prisma/client';

export class CreateAlertDto {
  @ApiProperty({ example: 'High CPU Alert' })
  @IsString() @MaxLength(100)
  name: string;

  @ApiProperty({ enum: MetricType, example: 'CPU' })
  @IsEnum(MetricType)
  metricType: MetricType;

  @ApiProperty({ example: 85, description: 'Fire when metric % reaches this value' })
  @IsNumber() @Min(0) @Max(100)
  threshold: number;

  @ApiPropertyOptional({ enum: Severity, default: 'WARNING' })
  @IsEnum(Severity) @IsOptional()
  severity?: Severity;

  @ApiPropertyOptional({ default: true })
  @IsBoolean() @IsOptional()
  isActive?: boolean;

  @ApiProperty()
  @IsUUID()
  serverId: string;
}