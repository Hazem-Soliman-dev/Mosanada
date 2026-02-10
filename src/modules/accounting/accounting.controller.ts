import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { TenantId } from '../../common/decorators/tenant.decorator';
import { AccountingService } from './accounting.service';
import {
  AccountResponseDto,
  JournalEntryResponseDto,
  RevenueRecognitionResponseDto,
} from './dto/accounting.dto';

@ApiTags('Accounting')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api')
export class AccountingController {
  constructor(private accountingService: AccountingService) {}

  @Get('accounts')
  @ApiOperation({ summary: 'Get chart of accounts' })
  @ApiResponse({ status: 200, description: 'Chart of accounts', type: [AccountResponseDto] })
  async getAccounts(@TenantId() tenantId: string) {
    return this.accountingService.getAccounts(tenantId);
  }

  @Get('accounts/:id/ledger')
  @ApiOperation({ summary: 'Get ledger for an account', description: 'Shows all journal entry lines for the given account with running balance.' })
  @ApiParam({ name: 'id', description: 'Account ID' })
  @ApiResponse({ status: 200, description: 'Account ledger with running balance' })
  @ApiResponse({ status: 404, description: 'Account not found' })
  async getLedger(@TenantId() tenantId: string, @Param('id') id: string) {
    return this.accountingService.getLedger(tenantId, id);
  }

  @Get('journal-entries')
  @ApiOperation({ summary: 'List all journal entries' })
  @ApiResponse({ status: 200, description: 'List of journal entries', type: [JournalEntryResponseDto] })
  async getJournalEntries(@TenantId() tenantId: string) {
    return this.accountingService.getJournalEntries(tenantId);
  }

  @Post('accounting/recognize-revenue')
  @ApiOperation({
    summary: 'Recognize deferred revenue',
    description: 'End-of-month revenue recognition. IDEMPOTENT. Creates journal entries: DR Deferred Revenue, CR Subscription Revenue — only for periods that have ended and haven\'t been recognized yet.',
  })
  @ApiResponse({ status: 201, description: 'Revenue recognized', type: RevenueRecognitionResponseDto })
  async recognizeRevenue(@TenantId() tenantId: string) {
    return this.accountingService.recognizeRevenue(tenantId);
  }
}
