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
exports.PaymentResponseDto = exports.CreatePaymentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreatePaymentDto {
    invoiceId;
    amount;
    method;
    paidAt;
}
exports.CreatePaymentDto = CreatePaymentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Invoice ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePaymentDto.prototype, "invoiceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 500.00, description: 'Payment amount', type: Number }),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0.01),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreatePaymentDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'BANK_TRANSFER',
        enum: ['BANK_TRANSFER', 'CREDIT_CARD', 'CASH', 'OTHER'],
        default: 'BANK_TRANSFER',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['BANK_TRANSFER', 'CREDIT_CARD', 'CASH', 'OTHER']),
    __metadata("design:type", String)
], CreatePaymentDto.prototype, "method", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2024-01-10T00:00:00.000Z', description: 'Payment date (defaults to now)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreatePaymentDto.prototype, "paidAt", void 0);
class PaymentResponseDto {
    id;
    amount;
    method;
    paidAt;
    invoice;
}
exports.PaymentResponseDto = PaymentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '550e8400-e29b-41d4-a716-446655440000' }),
    __metadata("design:type", String)
], PaymentResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '500.00' }),
    __metadata("design:type", Object)
], PaymentResponseDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'BANK_TRANSFER' }),
    __metadata("design:type", String)
], PaymentResponseDto.prototype, "method", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-10T00:00:00.000Z' }),
    __metadata("design:type", Date)
], PaymentResponseDto.prototype, "paidAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], PaymentResponseDto.prototype, "invoice", void 0);
//# sourceMappingURL=payment.dto.js.map