import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { TenantId } from '../../common/decorators/tenant.decorator';
import { InvoicesService } from './invoices.service';
import { InvoiceResponseDto, GenerateInvoicesResponseDto } from './dto/invoice.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api')
export class InvoicesController {
  constructor(private invoicesService: InvoicesService) {}

  @Post('billing/generate-invoices')
  @ApiTags('Billing')
  @ApiOperation({
    summary: 'Generate monthly invoices',
    description: 'Generates invoices for all active subscriptions. IDEMPOTENT — skips already-generated invoices. Creates journal entries: DR Accounts Receivable, CR Deferred Revenue.',
  })
  @ApiResponse({ status: 201, description: 'Invoices generated', type: GenerateInvoicesResponseDto })
  async generateInvoices(@TenantId() tenantId: string) {
    return this.invoicesService.generateInvoices(tenantId);
  }

  @Get('invoices')
  @ApiTags('Billing')
  @ApiOperation({ summary: 'List all invoices' })
  @ApiResponse({ status: 200, description: 'List of invoices', type: [InvoiceResponseDto] })
  async findAll(@TenantId() tenantId: string) {
    return this.invoicesService.findAll(tenantId);
  }

  @Get('invoices/:id')
  @ApiTags('Billing')
  @ApiOperation({ summary: 'Get invoice details' })
  @ApiParam({ name: 'id', description: 'Invoice ID' })
  @ApiResponse({ status: 200, description: 'Invoice details', type: InvoiceResponseDto })
  @ApiResponse({ status: 404, description: 'Invoice not found' })
  async findOne(@TenantId() tenantId: string, @Param('id') id: string) {
    return this.invoicesService.findOne(tenantId, id);
  }
}
