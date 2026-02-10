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
exports.SubscriptionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const tenant_decorator_1 = require("../../common/decorators/tenant.decorator");
const subscriptions_service_1 = require("./subscriptions.service");
const subscription_dto_1 = require("./dto/subscription.dto");
let SubscriptionsController = class SubscriptionsController {
    subscriptionsService;
    constructor(subscriptionsService) {
        this.subscriptionsService = subscriptionsService;
    }
    async create(tenantId, dto) {
        return this.subscriptionsService.create(tenantId, dto);
    }
    async findAll(tenantId) {
        return this.subscriptionsService.findAll(tenantId);
    }
    async findOne(tenantId, id) {
        return this.subscriptionsService.findOne(tenantId, id);
    }
    async cancel(tenantId, id) {
        return this.subscriptionsService.cancel(tenantId, id);
    }
};
exports.SubscriptionsController = SubscriptionsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a subscription', description: 'Link a customer to a plan' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Subscription created', type: subscription_dto_1.SubscriptionResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Customer or Plan not found' }),
    __param(0, (0, tenant_decorator_1.TenantId)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, subscription_dto_1.CreateSubscriptionDto]),
    __metadata("design:returntype", Promise)
], SubscriptionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all subscriptions' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of subscriptions', type: [subscription_dto_1.SubscriptionResponseDto] }),
    __param(0, (0, tenant_decorator_1.TenantId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubscriptionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get subscription details' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Subscription ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Subscription details', type: subscription_dto_1.SubscriptionResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Subscription not found' }),
    __param(0, (0, tenant_decorator_1.TenantId)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SubscriptionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/cancel'),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel a subscription' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Subscription ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Subscription cancelled', type: subscription_dto_1.SubscriptionResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Subscription not found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Already cancelled' }),
    __param(0, (0, tenant_decorator_1.TenantId)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SubscriptionsController.prototype, "cancel", null);
exports.SubscriptionsController = SubscriptionsController = __decorate([
    (0, swagger_1.ApiTags)('Subscriptions'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('api/subscriptions'),
    __metadata("design:paramtypes", [subscriptions_service_1.SubscriptionsService])
], SubscriptionsController);
//# sourceMappingURL=subscriptions.controller.js.map