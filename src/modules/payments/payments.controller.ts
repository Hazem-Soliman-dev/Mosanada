import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { TenantId } from '../../common/decorators/tenant.decorator';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto, PaymentResponseDto } from './dto/payment.dto';

@ApiTags('Payments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post()
  @ApiOperation({
    summary: 'Record a payment',
    description: 'Records a payment against an invoice. Creates journal entry: DR Cash, CR Accounts Receivable. Updates invoice status to PAID.',
  })
  @ApiResponse({ status: 201, description: 'Payment recorded', type: PaymentResponseDto })
  @ApiResponse({ status: 404, description: 'Invoice not found' })
  @ApiResponse({ status: 400, description: 'Invoice already paid' })
  async create(@TenantId() tenantId: string, @Body() dto: CreatePaymentDto) {
    return this.paymentsService.create(tenantId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all payments' })
  @ApiResponse({ status: 200, description: 'List of payments', type: [PaymentResponseDto] })
  async findAll(@TenantId() tenantId: string) {
    return this.paymentsService.findAll(tenantId);
  }
}
