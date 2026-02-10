import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateSubscriptionDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Customer ID' })
  @IsString()
  @IsNotEmpty()
  customerId: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440001', description: 'Plan ID' })
  @IsString()
  @IsNotEmpty()
  planId: string;

  @ApiPropertyOptional({ example: '2024-01-01', description: 'Start date (defaults to today)' })
  @IsOptional()
  @IsDateString()
  startDate?: string;
}

export class SubscriptionResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ example: 'ACTIVE' })
  status: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  startDate: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  currentPeriodStart: Date;

  @ApiProperty({ example: '2024-01-31T23:59:59.999Z' })
  currentPeriodEnd: Date;

  @ApiPropertyOptional()
  cancelledAt?: Date;

  @ApiProperty()
  customer?: any;

  @ApiProperty()
  plan?: any;
}
