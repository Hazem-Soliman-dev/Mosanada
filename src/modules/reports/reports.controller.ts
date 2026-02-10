import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { TenantId } from '../../common/decorators/tenant.decorator';
import { ReportsService } from './reports.service';
import { IncomeStatementResponseDto, BalanceSheetResponseDto } from './dto/reports.dto';

@ApiTags('Reports')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get('income-statement')
  @ApiOperation({
    summary: 'Income statement',
    description: 'Returns revenue and net income for the given date range.',
  })
  @ApiQuery({ name: 'startDate', required: true, example: '2024-01-01', description: 'Start date (YYYY-MM-DD)' })
  @ApiQuery({ name: 'endDate', required: true, example: '2024-12-31', description: 'End date (YYYY-MM-DD)' })
  @ApiResponse({ status: 200, description: 'Income statement', type: IncomeStatementResponseDto })
  async incomeStatement(
    @TenantId() tenantId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.reportsService.getIncomeStatement(tenantId, startDate, endDate);
  }

  @Get('balance-sheet')
  @ApiOperation({
    summary: 'Balance sheet',
    description: 'Returns assets, liabilities, equity, and a balance check as of the given date.',
  })
  @ApiQuery({ name: 'asOfDate', required: true, example: '2024-12-31', description: 'As of date (YYYY-MM-DD)' })
  @ApiResponse({ status: 200, description: 'Balance sheet', type: BalanceSheetResponseDto })
  async balanceSheet(
    @TenantId() tenantId: string,
    @Query('asOfDate') asOfDate: string,
  ) {
    return this.reportsService.getBalanceSheet(tenantId, asOfDate);
  }
}
