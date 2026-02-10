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
exports.ReportsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const tenant_decorator_1 = require("../../common/decorators/tenant.decorator");
const reports_service_1 = require("./reports.service");
const reports_dto_1 = require("./dto/reports.dto");
let ReportsController = class ReportsController {
    reportsService;
    constructor(reportsService) {
        this.reportsService = reportsService;
    }
    async incomeStatement(tenantId, startDate, endDate) {
        return this.reportsService.getIncomeStatement(tenantId, startDate, endDate);
    }
    async balanceSheet(tenantId, asOfDate) {
        return this.reportsService.getBalanceSheet(tenantId, asOfDate);
    }
};
exports.ReportsController = ReportsController;
__decorate([
    (0, common_1.Get)('income-statement'),
    (0, swagger_1.ApiOperation)({
        summary: 'Income statement',
        description: 'Returns revenue and net income for the given date range.',
    }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: true, example: '2024-01-01', description: 'Start date (YYYY-MM-DD)' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: true, example: '2024-12-31', description: 'End date (YYYY-MM-DD)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Income statement', type: reports_dto_1.IncomeStatementResponseDto }),
    __param(0, (0, tenant_decorator_1.TenantId)()),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "incomeStatement", null);
__decorate([
    (0, common_1.Get)('balance-sheet'),
    (0, swagger_1.ApiOperation)({
        summary: 'Balance sheet',
        description: 'Returns assets, liabilities, equity, and a balance check as of the given date.',
    }),
    (0, swagger_1.ApiQuery)({ name: 'asOfDate', required: true, example: '2024-12-31', description: 'As of date (YYYY-MM-DD)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Balance sheet', type: reports_dto_1.BalanceSheetResponseDto }),
    __param(0, (0, tenant_decorator_1.TenantId)()),
    __param(1, (0, common_1.Query)('asOfDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "balanceSheet", null);
exports.ReportsController = ReportsController = __decorate([
    (0, swagger_1.ApiTags)('Reports'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('api/reports'),
    __metadata("design:paramtypes", [reports_service_1.ReportsService])
], ReportsController);
//# sourceMappingURL=reports.controller.js.map