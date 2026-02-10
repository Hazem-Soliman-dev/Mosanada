import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsEnum, IsDateString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePaymentDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Invoice ID' })
  @IsString()
  @IsNotEmpty()
  invoiceId: string;

  @ApiProperty({ example: 500.00, description: 'Payment amount', type: Number })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  @Type(() => Number)
  amount: number;

  @ApiPropertyOptional({
    example: 'BANK_TRANSFER',
    enum: ['BANK_TRANSFER', 'CREDIT_CARD', 'CASH', 'OTHER'],
    default: 'BANK_TRANSFER',
  })
  @IsOptional()
  @IsEnum(['BANK_TRANSFER', 'CREDIT_CARD', 'CASH', 'OTHER'])
  method?: string;

  @ApiPropertyOptional({ example: '2024-01-10T00:00:00.000Z', description: 'Payment date (defaults to now)' })
  @IsOptional()
  @IsDateString()
  paidAt?: string;
}

export class PaymentResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ example: '500.00' })
  amount: any;

  @ApiProperty({ example: 'BANK_TRANSFER' })
  method: string;

  @ApiProperty({ example: '2024-01-10T00:00:00.000Z' })
  paidAt: Date;

  @ApiProperty()
  invoice?: any;
}
