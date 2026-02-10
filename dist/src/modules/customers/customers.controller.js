"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const tenant_decorator_1 = require("../../common/decorators/tenant.decorator");
const customers_service_1 = require("./customers.service");
const customer_dto_1 = require("./dto/customer.dto");
let CustomersController = class CustomersController {
    customersService;
    constructor(customersService) {
        this.customersService = customersService;
    }
    async create(tenantId, dto) {
        return this.customersService.create(tenantId, dto);
    }
    async findAll(tenantId) {
        return this.customersService.findAll(tenantId);
    }
    async findOne(tenantId, id) {
        return this.customersService.findOne(tenantId, id);
    }
    async update(tenantId, id, dto) {
        return this.customersService.update(tenantId, id, dto);
    }
    async remove(tenantId, id) {
        return this.customersService.remove(tenantId, id);
    }
};
exports.CustomersController = CustomersController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new customer' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Customer created', type: customer_dto_1.CustomerResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Customer email already exists' }),
    __param(0, (0, tenant_decorator_1.TenantId)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, customer_dto_1.CreateCustomerDto]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all customers' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of customers', type: [customer_dto_1.CustomerResponseDto] }),
    __param(0, (0, tenant_decorator_1.TenantId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a customer by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Customer ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Customer details', type: customer_dto_1.CustomerResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Customer not found' }),
    __param(0, (0, tenant_decorator_1.TenantId)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a customer' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Customer ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Customer updated', type: customer_dto_1.CustomerResponseDto }),
    __param(0, (0, tenant_decorator_1.TenantId)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, customer_dto_1.UpdateCustomerDto]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a customer' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Customer ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Customer deleted' }),
    __param(0, (0, tenant_decorator_1.TenantId)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "remove", null);
exports.CustomersController = CustomersController = __decorate([
    (0, swagger_1.ApiTags)('Customers'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('api/customers'),
    __metadata("design:paramtypes", [customers_service_1.CustomersService])
], CustomersController);
//# sourceMappingURL=customers.controller.js.map