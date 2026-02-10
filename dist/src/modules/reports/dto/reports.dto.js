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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceSheetResponseDto = exports.IncomeStatementResponseDto = exports.BalanceSheetQueryDto = exports.IncomeStatementQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class IncomeStatementQueryDto {
    startDate;
    endDate;
}
exports.IncomeStatementQueryDto = IncomeStatementQueryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-01', description: 'Start date (YYYY-MM-DD)' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], IncomeStatementQueryDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-12-31', description: 'End date (YYYY-MM-DD)' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], IncomeStatementQueryDto.prototype, "endDate", void 0);
class BalanceSheetQueryDto {
    asOfDate;
}
exports.BalanceSheetQueryDto = BalanceSheetQueryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-12-31', description: 'As of date (YYYY-MM-DD)' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], BalanceSheetQueryDto.prototype, "asOfDate", void 0);
class IncomeStatementResponseDto {
    revenue;
    netIncome;
}
exports.IncomeStatementResponseDto = IncomeStatementResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: { subscriptionRevenue: 5000 },
        description: 'Revenue breakdown',
    }),
    __metadata("design:type", Object)
], IncomeStatementResponseDto.prototype, "revenue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5000, description: 'Net income (revenue - expenses)' }),
    __metadata("design:type", Number)
], IncomeStatementResponseDto.prototype, "netIncome", void 0);
class BalanceSheetResponseDto {
    assets;
    liabilities;
    equity;
    balanceCheck;
}
exports.BalanceSheetResponseDto = BalanceSheetResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: { cash: 5000, accountsReceivable: 0 },
        description: 'Asset accounts',
    }),
    __metadata("design:type", Object)
], BalanceSheetResponseDto.prototype, "assets", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: { deferredRevenue: 0 },
        description: 'Liability accounts',
    }),
    __metadata("design:type", Object)
], BalanceSheetResponseDto.prototype, "liabilities", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: { retainedEarnings: 5000 },
        description: 'Equity (retained earnings = total revenue - total expenses)',
    }),
    __metadata("design:type", Object)
], BalanceSheetResponseDto.prototype, "equity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'True if Assets === Liabilities + Equity',
    }),
    __metadata("design:type", Boolean)
], BalanceSheetResponseDto.prototype, "balanceCheck", void 0);
//# sourceMappingURL=reports.dto.js.map