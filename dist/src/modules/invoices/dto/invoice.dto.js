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
exports.GenerateInvoicesResponseDto = exports.InvoiceResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class InvoiceResponseDto {
    id;
    amount;
    status;
    periodStart;
    periodEnd;
    dueDate;
    paidAt;
    subscription;
    customer;
}
exports.InvoiceResponseDto = InvoiceResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '550e8400-e29b-41d4-a716-446655440000' }),
    __metadata("design:type", String)
], InvoiceResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '500.00' }),
    __metadata("design:type", Object)
], InvoiceResponseDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'PENDING', enum: ['PENDING', 'PAID', 'OVERDUE', 'VOID'] }),
    __metadata("design:type", String)
], InvoiceResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-01T00:00:00.000Z' }),
    __metadata("design:type", Date)
], InvoiceResponseDto.prototype, "periodStart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-31T23:59:59.999Z' }),
    __metadata("design:type", Date)
], InvoiceResponseDto.prototype, "periodEnd", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-15T00:00:00.000Z' }),
    __metadata("design:type", Date)
], InvoiceResponseDto.prototype, "dueDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2024-01-10T00:00:00.000Z' }),
    __metadata("design:type", Date)
], InvoiceResponseDto.prototype, "paidAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], InvoiceResponseDto.prototype, "subscription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], InvoiceResponseDto.prototype, "customer", void 0);
class GenerateInvoicesResponseDto {
    generated;
    skipped;
    invoices;
}
exports.GenerateInvoicesResponseDto = GenerateInvoicesResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3, description: 'Number of new invoices generated' }),
    __metadata("design:type", Number)
], GenerateInvoicesResponseDto.prototype, "generated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, description: 'Number of invoices skipped (already exist)' }),
    __metadata("design:type", Number)
], GenerateInvoicesResponseDto.prototype, "skipped", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [InvoiceResponseDto] }),
    __metadata("design:type", Array)
], GenerateInvoicesResponseDto.prototype, "invoices", void 0);
//# sourceMappingURL=invoice.dto.js.map