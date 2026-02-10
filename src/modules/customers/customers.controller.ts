import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { TenantId } from '../../common/decorators/tenant.decorator';
import { CustomersService } from './customers.service';
import { CreateCustomerDto, UpdateCustomerDto, CustomerResponseDto } from './dto/customer.dto';

@ApiTags('Customers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiResponse({ status: 201, description: 'Customer created', type: CustomerResponseDto })
  @ApiResponse({ status: 409, description: 'Customer email already exists' })
  async create(@TenantId() tenantId: string, @Body() dto: CreateCustomerDto) {
    return this.customersService.create(tenantId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all customers' })
  @ApiResponse({ status: 200, description: 'List of customers', type: [CustomerResponseDto] })
  async findAll(@TenantId() tenantId: string) {
    return this.customersService.findAll(tenantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a customer by ID' })
  @ApiParam({ name: 'id', description: 'Customer ID' })
  @ApiResponse({ status: 200, description: 'Customer details', type: CustomerResponseDto })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  async findOne(@TenantId() tenantId: string, @Param('id') id: string) {
    return this.customersService.findOne(tenantId, id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a customer' })
  @ApiParam({ name: 'id', description: 'Customer ID' })
  @ApiResponse({ status: 200, description: 'Customer updated', type: CustomerResponseDto })
  async update(@TenantId() tenantId: string, @Param('id') id: string, @Body() dto: UpdateCustomerDto) {
    return this.customersService.update(tenantId, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a customer' })
  @ApiParam({ name: 'id', description: 'Customer ID' })
  @ApiResponse({ status: 200, description: 'Customer deleted' })
  async remove(@TenantId() tenantId: string, @Param('id') id: string) {
    return this.customersService.remove(tenantId, id);
  }
}
