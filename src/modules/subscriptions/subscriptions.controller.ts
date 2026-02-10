import { Controller, Get, Post, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { TenantId } from '../../common/decorators/tenant.decorator';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto, SubscriptionResponseDto } from './dto/subscription.dto';

@ApiTags('Subscriptions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/subscriptions')
export class SubscriptionsController {
  constructor(private subscriptionsService: SubscriptionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a subscription', description: 'Link a customer to a plan' })
  @ApiResponse({ status: 201, description: 'Subscription created', type: SubscriptionResponseDto })
  @ApiResponse({ status: 404, description: 'Customer or Plan not found' })
  async create(@TenantId() tenantId: string, @Body() dto: CreateSubscriptionDto) {
    return this.subscriptionsService.create(tenantId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all subscriptions' })
  @ApiResponse({ status: 200, description: 'List of subscriptions', type: [SubscriptionResponseDto] })
  async findAll(@TenantId() tenantId: string) {
    return this.subscriptionsService.findAll(tenantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get subscription details' })
  @ApiParam({ name: 'id', description: 'Subscription ID' })
  @ApiResponse({ status: 200, description: 'Subscription details', type: SubscriptionResponseDto })
  @ApiResponse({ status: 404, description: 'Subscription not found' })
  async findOne(@TenantId() tenantId: string, @Param('id') id: string) {
    return this.subscriptionsService.findOne(tenantId, id);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancel a subscription' })
  @ApiParam({ name: 'id', description: 'Subscription ID' })
  @ApiResponse({ status: 200, description: 'Subscription cancelled', type: SubscriptionResponseDto })
  @ApiResponse({ status: 404, description: 'Subscription not found' })
  @ApiResponse({ status: 400, description: 'Already cancelled' })
  async cancel(@TenantId() tenantId: string, @Param('id') id: string) {
    return this.subscriptionsService.cancel(tenantId, id);
  }
}
