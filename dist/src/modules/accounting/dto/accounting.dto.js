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
exports.RevenueRecognitionResponseDto = exports.LedgerEntryDto = exports.JournalEntryResponseDto = exports.JournalEntryLineResponseDto = exports.AccountResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class AccountResponseDto {
    id;
    code;
    name;
    type;
    normalBalance;
}
exports.AccountResponseDto = AccountResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '550e8400-e29b-41d4-a716-446655440000' }),
    __metadata("design:type", String)
], AccountResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1001' }),
    __metadata("design:type", String)
], AccountResponseDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Cash' }),
    __metadata("design:type", String)
], AccountResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ASSET', enum: ['ASSET', 'LIABILITY', 'EQUITY', 'REVENUE', 'EXPENSE'] }),
    __metadata("design:type", String)
], AccountResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'DEBIT', enum: ['DEBIT', 'CREDIT'] }),
    __metadata("design:type", String)
], AccountResponseDto.prototype, "normalBalance", void 0);
class JournalEntryLineResponseDto {
    id;
    debit;
    credit;
    account;
}
exports.JournalEntryLineResponseDto = JournalEntryLineResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '550e8400-e29b-41d4-a716-446655440000' }),
    __metadata("design:type", String)
], JournalEntryLineResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '500.00' }),
    __metadata("design:type", Object)
], JournalEntryLineResponseDto.prototype, "debit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '0.00' }),
    __metadata("design:type", Object)
], JournalEntryLineResponseDto.prototype, "credit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", AccountResponseDto)
], JournalEntryLineResponseDto.prototype, "account", void 0);
class JournalEntryResponseDto {
    id;
    date;
    description;
    referenceType;
    referenceId;
    lines;
}
exports.JournalEntryResponseDto = JournalEntryResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '550e8400-e29b-41d4-a716-446655440000' }),
    __metadata("design:type", String)
], JournalEntryResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-01T00:00:00.000Z' }),
    __metadata("design:type", Date)
], JournalEntryResponseDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Invoice generated for subscription abc123' }),
    __metadata("design:type", String)
], JournalEntryResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'INVOICE' }),
    __metadata("design:type", String)
], JournalEntryResponseDto.prototype, "referenceType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '550e8400-e29b-41d4-a716-446655440001' }),
    __metadata("design:type", String)
], JournalEntryResponseDto.prototype, "referenceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [JournalEntryLineResponseDto] }),
    __metadata("design:type", Array)
], JournalEntryResponseDto.prototype, "lines", void 0);
class LedgerEntryDto {
    date;
    description;
    debit;
    credit;
    runningBalance;
}
exports.LedgerEntryDto = LedgerEntryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-01T00:00:00.000Z' }),
    __metadata("design:type", Date)
], LedgerEntryDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Invoice generated for subscription abc123' }),
    __metadata("design:type", String)
], LedgerEntryDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '500.00' }),
    __metadata("design:type", Object)
], LedgerEntryDto.prototype, "debit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '0.00' }),
    __metadata("design:type", Object)
], LedgerEntryDto.prototype, "credit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '500.00' }),
    __metadata("design:type", Object)
], LedgerEntryDto.prototype, "runningBalance", void 0);
class RevenueRecognitionResponseDto {
    recognized;
    skipped;
    totalAmount;
}
exports.RevenueRecognitionResponseDto = RevenueRecognitionResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3, description: 'Number of invoices with revenue recognized' }),
    __metadata("design:type", Number)
], RevenueRecognitionResponseDto.prototype, "recognized", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, description: 'Number of invoices skipped (already recognized)' }),
    __metadata("design:type", Number)
], RevenueRecognitionResponseDto.prototype, "skipped", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1500.00', description: 'Total amount recognized' }),
    __metadata("design:type", String)
], RevenueRecognitionResponseDto.prototype, "totalAmount", void 0);
//# sourceMappingURL=accounting.dto.js.map