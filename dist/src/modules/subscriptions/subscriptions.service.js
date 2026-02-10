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
exports.SubscriptionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let SubscriptionsService = class SubscriptionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(tenantId, dto) {
        const customer = await this.prisma.customer.findFirst({
            where: { id: dto.customerId, tenantId },
        });
        if (!customer)
            throw new common_1.NotFoundException('Customer not found');
        const plan = await this.prisma.plan.findFirst({
            where: { id: dto.planId, tenantId, isActive: true },
        });
        if (!plan)
            throw new common_1.NotFoundException('Plan not found or inactive');
        const startDate = dto.startDate ? new Date(dto.startDate) : new Date();
        const periodStart = new Date(startDate);
        const periodEnd = new Date(startDate);
        switch (plan.billingCycle) {
            case 'MONTHLY':
                periodEnd.setMonth(periodEnd.getMonth() + 1);
                break;
            case 'QUARTERLY':
                periodEnd.setMonth(periodEnd.getMonth() + 3);
                break;
            case 'YEARLY':
                periodEnd.setFullYear(periodEnd.getFullYear() + 1);
                break;
        }
        periodEnd.setMilliseconds(periodEnd.getMilliseconds() - 1);
        return this.prisma.subscription.create({
            data: {
                tenantId,
                customerId: dto.customerId,
                planId: dto.planId,
                status: 'ACTIVE',
                startDate,
                currentPeriodStart: periodStart,
                currentPeriodEnd: periodEnd,
            },
            include: { customer: true, plan: true },
        });
    }
    async findAll(tenantId) {
        return this.prisma.subscription.findMany({
            where: { tenantId },
            include: { customer: true, plan: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(tenantId, id) {
        const sub = await this.prisma.subscription.findFirst({
            where: { id, tenantId },
            include: { customer: true, plan: true, invoices: true },
        });
        if (!sub)
            throw new common_1.NotFoundException('Subscription not found');
        return sub;
    }
    async cancel(tenantId, id) {
        const sub = await this.prisma.subscription.findFirst({
            where: { id, tenantId },
        });
        if (!sub)
            throw new common_1.NotFoundException('Subscription not found');
        if (sub.status === 'CANCELLED') {
            throw new common_1.BadRequestException('Subscription is already cancelled');
        }
        return this.prisma.subscription.update({
            where: { id },
            data: {
                status: 'CANCELLED',
                cancelledAt: new Date(),
            },
            include: { customer: true, plan: true },
        });
    }
};
exports.SubscriptionsService = SubscriptionsService;
exports.SubscriptionsService = SubscriptionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SubscriptionsService);
//# sourceMappingURL=subscriptions.service.js.map