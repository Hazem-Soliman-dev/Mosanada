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
exports.PlansController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const tenant_decorator_1 = require("../../common/decorators/tenant.decorator");
const plans_service_1 = require("./plans.service");
const plan_dto_1 = require("./dto/plan.dto");
let PlansController = class PlansController {
    plansService;
    constructor(plansService) {
        this.plansService = plansService;
    }
    async create(tenantId, dto) {
        return this.plansService.create(tenantId, dto);
    }
    async findAll(tenantId) {
        return this.plansService.findAll(tenantId);
    }
    async findOne(tenantId, id) {
        return this.plansService.findOne(tenantId, id);
    }
    async update(tenantId, id, dto) {
        return this.plansService.update(tenantId, id, dto);
    }
    async remove(tenantId, id) {
        return this.plansService.remove(tenantId, id);
    }
};
exports.PlansController = PlansController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new plan' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Plan created', type: plan_dto_1.PlanResponseDto }),
    __param(0, (0, tenant_decorator_1.TenantId)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, plan_dto_1.CreatePlanDto]),
    __metadata("design:returntype", Promise)
], PlansController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all plans' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of plans', type: [plan_dto_1.PlanResponseDto] }),
    __param(0, (0, tenant_decorator_1.TenantId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlansController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a plan by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Plan ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Plan details', type: plan_dto_1.PlanResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Plan not found' }),
    __param(0, (0, tenant_decorator_1.TenantId)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PlansController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a plan' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Plan ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Plan updated', type: plan_dto_1.PlanResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Plan not found' }),
    __param(0, (0, tenant_decorator_1.TenantId)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, plan_dto_1.UpdatePlanDto]),
    __metadata("design:returntype", Promise)
], PlansController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a plan' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Plan ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Plan deleted' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Plan not found' }),
    __param(0, (0, tenant_decorator_1.TenantId)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PlansController.prototype, "remove", null);
exports.PlansController = PlansController = __decorate([
    (0, swagger_1.ApiTags)('Plans'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('api/plans'),
    __metadata("design:paramtypes", [plans_service_1.PlansService])
], PlansController);
//# sourceMappingURL=plans.controller.js.map