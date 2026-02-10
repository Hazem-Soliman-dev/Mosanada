import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class InvoiceResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ example: '500.00' })
  amount: any;

  @ApiProperty({ example: 'PENDING', enum: ['PENDING', 'PAID', 'OVERDUE', 'VOID'] })
  status: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  periodStart: Date;

  @ApiProperty({ example: '2024-01-31T23:59:59.999Z' })
  periodEnd: Date;

  @ApiProperty({ example: '2024-01-15T00:00:00.000Z' })
  dueDate: Date;

  @ApiPropertyOptional({ example: '2024-01-10T00:00:00.000Z' })
  paidAt?: Date;

  @ApiProperty()
  subscription?: any;

  @ApiProperty()
  customer?: any;
}

export class GenerateInvoicesResponseDto {
  @ApiProperty({ example: 3, description: 'Number of new invoices generated' })
  generated: number;

  @ApiProperty({ example: 2, description: 'Number of invoices skipped (already exist)' })
  skipped: number;

  @ApiProperty({ type: [InvoiceResponseDto] })
  invoices: InvoiceResponseDto[];
}
