import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';

export class IncomeStatementQueryDto {
  @ApiProperty({ example: '2024-01-01', description: 'Start date (YYYY-MM-DD)' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: '2024-12-31', description: 'End date (YYYY-MM-DD)' })
  @IsDateString()
  endDate: string;
}

export class BalanceSheetQueryDto {
  @ApiProperty({ example: '2024-12-31', description: 'As of date (YYYY-MM-DD)' })
  @IsDateString()
  asOfDate: string;
}

export class IncomeStatementResponseDto {
  @ApiProperty({
    example: { subscriptionRevenue: 5000 },
    description: 'Revenue breakdown',
  })
  revenue: { subscriptionRevenue: number };

  @ApiProperty({ example: 5000, description: 'Net income (revenue - expenses)' })
  netIncome: number;
}

export class BalanceSheetResponseDto {
  @ApiProperty({
    example: { cash: 5000, accountsReceivable: 0 },
    description: 'Asset accounts',
  })
  assets: { cash: number; accountsReceivable: number };

  @ApiProperty({
    example: { deferredRevenue: 0 },
    description: 'Liability accounts',
  })
  liabilities: { deferredRevenue: number };

  @ApiProperty({
    example: { retainedEarnings: 5000 },
    description: 'Equity (retained earnings = total revenue - total expenses)',
  })
  equity: { retainedEarnings: number };

  @ApiProperty({
    example: true,
    description: 'True if Assets === Liabilities + Equity',
  })
  balanceCheck: boolean;
}
