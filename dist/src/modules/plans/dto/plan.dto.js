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
exports.PlanResponseDto = exports.UpdatePlanDto = exports.CreatePlanDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreatePlanDto {
    name;
    price;
    billingCycle;
    isActive;
}
exports.CreatePlanDto = CreatePlanDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Professional Plan', description: 'Plan name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePlanDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 500.00, description: 'Monthly price', type: Number }),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreatePlanDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'MONTHLY', enum: ['MONTHLY', 'QUARTERLY', 'YEARLY'], default: 'MONTHLY' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['MONTHLY', 'QUARTERLY', 'YEARLY']),
    __metadata("design:type", String)
], CreatePlanDto.prototype, "billingCycle", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true, default: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreatePlanDto.prototype, "isActive", void 0);
class UpdatePlanDto {
    name;
    price;
    billingCycle;
    isActive;
}
exports.UpdatePlanDto = UpdatePlanDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Enterprise Plan' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePlanDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1000.00, type: Number }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdatePlanDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'MONTHLY', enum: ['MONTHLY', 'QUARTERLY', 'YEARLY'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['MONTHLY', 'QUARTERLY', 'YEARLY']),
    __metadata("design:type", String)
], UpdatePlanDto.prototype, "billingCycle", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdatePlanDto.prototype, "isActive", void 0);
class PlanResponseDto {
    id;
    name;
    price;
    billingCycle;
    isActive;
    createdAt;
}
exports.PlanResponseDto = PlanResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '550e8400-e29b-41d4-a716-446655440000' }),
    __metadata("design:type", String)
], PlanResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Professional Plan' }),
    __metadata("design:type", String)
], PlanResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '500.00' }),
    __metadata("design:type", Object)
], PlanResponseDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'MONTHLY' }),
    __metadata("design:type", String)
], PlanResponseDto.prototype, "billingCycle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], PlanResponseDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-01T00:00:00.000Z' }),
    __metadata("design:type", Date)
], PlanResponseDto.prototype, "createdAt", void 0);
//# sourceMappingURL=plan.dto.js.map