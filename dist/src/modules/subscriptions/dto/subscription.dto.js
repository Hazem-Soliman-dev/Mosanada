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
exports.SubscriptionResponseDto = exports.CreateSubscriptionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateSubscriptionDto {
    customerId;
    planId;
    startDate;
}
exports.CreateSubscriptionDto = CreateSubscriptionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Customer ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSubscriptionDto.prototype, "customerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '550e8400-e29b-41d4-a716-446655440001', description: 'Plan ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSubscriptionDto.prototype, "planId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2024-01-01', description: 'Start date (defaults to today)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateSubscriptionDto.prototype, "startDate", void 0);
class SubscriptionResponseDto {
    id;
    status;
    startDate;
    currentPeriodStart;
    currentPeriodEnd;
    cancelledAt;
    customer;
    plan;
}
exports.SubscriptionResponseDto = SubscriptionResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '550e8400-e29b-41d4-a716-446655440000' }),
    __metadata("design:type", String)
], SubscriptionResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ACTIVE' }),
    __metadata("design:type", String)
], SubscriptionResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-01T00:00:00.000Z' }),
    __metadata("design:type", Date)
], SubscriptionResponseDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-01T00:00:00.000Z' }),
    __metadata("design:type", Date)
], SubscriptionResponseDto.prototype, "currentPeriodStart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-31T23:59:59.999Z' }),
    __metadata("design:type", Date)
], SubscriptionResponseDto.prototype, "currentPeriodEnd", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], SubscriptionResponseDto.prototype, "cancelledAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], SubscriptionResponseDto.prototype, "customer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], SubscriptionResponseDto.prototype, "plan", void 0);
//# sourceMappingURL=subscription.dto.js.map