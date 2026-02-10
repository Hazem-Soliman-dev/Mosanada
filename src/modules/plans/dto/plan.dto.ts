import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsBoolean, IsEnum, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePlanDto {
  @ApiProperty({ example: 'Professional Plan', description: 'Plan name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 500.00, description: 'Monthly price', type: Number })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Type(() => Number)
  price: number;

  @ApiPropertyOptional({ example: 'MONTHLY', enum: ['MONTHLY', 'QUARTERLY', 'YEARLY'], default: 'MONTHLY' })
  @IsOptional()
  @IsEnum(['MONTHLY', 'QUARTERLY', 'YEARLY'])
  billingCycle?: string;

  @ApiPropertyOptional({ example: true, default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdatePlanDto {
  @ApiPropertyOptional({ example: 'Enterprise Plan' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 1000.00, type: Number })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Type(() => Number)
  price?: number;

  @ApiPropertyOptional({ example: 'MONTHLY', enum: ['MONTHLY', 'QUARTERLY', 'YEARLY'] })
  @IsOptional()
  @IsEnum(['MONTHLY', 'QUARTERLY', 'YEARLY'])
  billingCycle?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class PlanResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ example: 'Professional Plan' })
  name: string;

  @ApiProperty({ example: '500.00' })
  price: any;

  @ApiProperty({ example: 'MONTHLY' })
  billingCycle: string;

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt: Date;
}
