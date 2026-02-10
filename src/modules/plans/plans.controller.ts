import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { TenantId } from '../../common/decorators/tenant.decorator';
import { PlansService } from './plans.service';
import { CreatePlanDto, UpdatePlanDto, PlanResponseDto } from './dto/plan.dto';

@ApiTags('Plans')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/plans')
export class PlansController {
  constructor(private plansService: PlansService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new plan' })
  @ApiResponse({ status: 201, description: 'Plan created', type: PlanResponseDto })
  async create(@TenantId() tenantId: string, @Body() dto: CreatePlanDto) {
    return this.plansService.create(tenantId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all plans' })
  @ApiResponse({ status: 200, description: 'List of plans', type: [PlanResponseDto] })
  async findAll(@TenantId() tenantId: string) {
    return this.plansService.findAll(tenantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a plan by ID' })
  @ApiParam({ name: 'id', description: 'Plan ID' })
  @ApiResponse({ status: 200, description: 'Plan details', type: PlanResponseDto })
  @ApiResponse({ status: 404, description: 'Plan not found' })
  async findOne(@TenantId() tenantId: string, @Param('id') id: string) {
    return this.plansService.findOne(tenantId, id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a plan' })
  @ApiParam({ name: 'id', description: 'Plan ID' })
  @ApiResponse({ status: 200, description: 'Plan updated', type: PlanResponseDto })
  @ApiResponse({ status: 404, description: 'Plan not found' })
  async update(@TenantId() tenantId: string, @Param('id') id: string, @Body() dto: UpdatePlanDto) {
    return this.plansService.update(tenantId, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a plan' })
  @ApiParam({ name: 'id', description: 'Plan ID' })
  @ApiResponse({ status: 200, description: 'Plan deleted' })
  @ApiResponse({ status: 404, description: 'Plan not found' })
  async remove(@TenantId() tenantId: string, @Param('id') id: string) {
    return this.plansService.remove(tenantId, id);
  }
}
