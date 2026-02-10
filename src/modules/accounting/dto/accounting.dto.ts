import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AccountResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ example: '1001' })
  code: string;

  @ApiProperty({ example: 'Cash' })
  name: string;

  @ApiProperty({ example: 'ASSET', enum: ['ASSET', 'LIABILITY', 'EQUITY', 'REVENUE', 'EXPENSE'] })
  type: string;

  @ApiProperty({ example: 'DEBIT', enum: ['DEBIT', 'CREDIT'] })
  normalBalance: string;
}

export class JournalEntryLineResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ example: '500.00' })
  debit: any;

  @ApiProperty({ example: '0.00' })
  credit: any;

  @ApiProperty()
  account?: AccountResponseDto;
}

export class JournalEntryResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  date: Date;

  @ApiProperty({ example: 'Invoice generated for subscription abc123' })
  description: string;

  @ApiProperty({ example: 'INVOICE' })
  referenceType: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440001' })
  referenceId: string;

  @ApiProperty({ type: [JournalEntryLineResponseDto] })
  lines: JournalEntryLineResponseDto[];
}

export class LedgerEntryDto {
  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  date: Date;

  @ApiProperty({ example: 'Invoice generated for subscription abc123' })
  description: string;

  @ApiProperty({ example: '500.00' })
  debit: any;

  @ApiProperty({ example: '0.00' })
  credit: any;

  @ApiProperty({ example: '500.00' })
  runningBalance: any;
}

export class RevenueRecognitionResponseDto {
  @ApiProperty({ example: 3, description: 'Number of invoices with revenue recognized' })
  recognized: number;

  @ApiProperty({ example: 2, description: 'Number of invoices skipped (already recognized)' })
  skipped: number;

  @ApiProperty({ example: '1500.00', description: 'Total amount recognized' })
  totalAmount: string;
}
