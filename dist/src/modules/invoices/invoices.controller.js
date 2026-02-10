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
exports.InvoicesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const tenant_decorator_1 = require("../../common/decorators/tenant.decorator");
const invoices_service_1 = require("./invoices.service");
const invoice_dto_1 = require("./dto/invoice.dto");
let InvoicesController = class InvoicesController {
    invoicesService;
    constructor(invoicesService) {
        this.invoicesService = invoicesService;
    }
    async generateInvoices(tenantId) {
        return this.invoicesService.generateInvoices(tenantId);
    }
    async findAll(tenantId) {
        return this.invoicesService.findAll(tenantId);
    }
    async findOne(tenantId, id) {
        return this.invoicesService.findOne(tenantId, id);
    }
};
exports.InvoicesController = InvoicesController;
__decorate([
    (0, common_1.Post)('billing/generate-invoices'),
    (0, swagger_1.ApiTags)('Billing'),
    (0, swagger_1.ApiOperation)({
        summary: 'Generate monthly invoices',
        description: 'Generates invoices for all active subscriptions. IDEMPOTENT — skips already-generated invoices. Creates journal entries: DR Accounts Receivable, CR Deferred Revenue.',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Invoices generated', type: invoice_dto_1.GenerateInvoicesResponseDto }),
    __param(0, (0, tenant_decorator_1.TenantId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvoicesController.prototype, "generateInvoices", null);
__decorate([
    (0, common_1.Get)('invoices'),
    (0, swagger_1.ApiTags)('Billing'),
    (0, swagger_1.ApiOperation)({ summary: 'List all invoices' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of invoices', type: [invoice_dto_1.InvoiceResponseDto] }),
    __param(0, (0, tenant_decorator_1.TenantId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvoicesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('invoices/:id'),
    (0, swagger_1.ApiTags)('Billing'),
    (0, swagger_1.ApiOperation)({ summary: 'Get invoice details' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Invoice ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Invoice details', type: invoice_dto_1.InvoiceResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Invoice not found' }),
    __param(0, (0, tenant_decorator_1.TenantId)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], InvoicesController.prototype, "findOne", null);
exports.InvoicesController = InvoicesController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [invoices_service_1.InvoicesService])
], InvoicesController);
//# sourceMappingURL=invoices.controller.js.map