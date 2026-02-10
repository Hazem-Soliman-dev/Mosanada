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
exports.InvoicesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let InvoicesService = class InvoicesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async generateInvoices(tenantId) {
        const activeSubscriptions = await this.prisma.subscription.findMany({
            where: { tenantId, status: 'ACTIVE' },
            include: { plan: true },
        });
        const accounts = await this.prisma.account.findMany({
            where: { tenantId },
        });
        const arAccount = accounts.find((a) => a.code === '1002');
        const deferredRevenueAccount = accounts.find((a) => a.code === '2001');
        if (!arAccount || !deferredRevenueAccount) {
            throw new Error('Chart of accounts not properly seeded for this tenant');
        }
        let generated = 0;
        let skipped = 0;
        const newInvoices = [];
        for (const sub of activeSubscriptions) {
            const periodStart = sub.currentPeriodStart;
            const periodEnd = sub.currentPeriodEnd;
            const existing = await this.prisma.invoice.findUnique({
                where: {
                    subscriptionId_periodStart_periodEnd: {
                        subscriptionId: sub.id,
                        periodStart,
                        periodEnd,
                    },
                },
            });
            if (existing) {
                skipped++;
                continue;
            }
            const result = await this.prisma.$transaction(async (tx) => {
                const dueDate = new Date();
                dueDate.setDate(dueDate.getDate() + 15);
                const invoice = await tx.invoice.create({
                    data: {
                        tenantId,
                        subscriptionId: sub.id,
                        customerId: sub.customerId,
                        amount: sub.plan.price,
                        status: 'PENDING',
                        periodStart,
                        periodEnd,
                        dueDate,
                    },
                    include: { subscription: true, customer: true },
                });
                await tx.journalEntry.create({
                    data: {
                        tenantId,
                        date: new Date(),
                        description: `Invoice generated for subscription ${sub.id}`,
                        referenceType: 'INVOICE',
                        referenceId: invoice.id,
                        lines: {
                            create: [
                                {
                                    accountId: arAccount.id,
                                    debit: sub.plan.price,
                                    credit: 0,
                                },
                                {
                                    accountId: deferredRevenueAccount.id,
                                    debit: 0,
                                    credit: sub.plan.price,
                                },
                            ],
                        },
                    },
                });
                return invoice;
            });
            newInvoices.push(result);
            generated++;
        }
        return { generated, skipped, invoices: newInvoices };
    }
    async findAll(tenantId) {
        return this.prisma.invoice.findMany({
            where: { tenantId },
            include: { subscription: { include: { plan: true } }, customer: true, payments: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(tenantId, id) {
        const invoice = await this.prisma.invoice.findFirst({
            where: { id, tenantId },
            include: { subscription: { include: { plan: true } }, customer: true, payments: true },
        });
        if (!invoice)
            throw new common_1.NotFoundException('Invoice not found');
        return invoice;
    }
};
exports.InvoicesService = InvoicesService;
exports.InvoicesService = InvoicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InvoicesService);
//# sourceMappingURL=invoices.service.js.map