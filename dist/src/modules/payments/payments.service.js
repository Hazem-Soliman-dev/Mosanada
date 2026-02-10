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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PaymentsService = class PaymentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(tenantId, dto) {
        const invoice = await this.prisma.invoice.findFirst({
            where: { id: dto.invoiceId, tenantId },
        });
        if (!invoice)
            throw new common_1.NotFoundException('Invoice not found');
        if (invoice.status === 'PAID') {
            throw new common_1.BadRequestException('Invoice is already paid');
        }
        const accounts = await this.prisma.account.findMany({
            where: { tenantId },
        });
        const cashAccount = accounts.find((a) => a.code === '1001');
        const arAccount = accounts.find((a) => a.code === '1002');
        if (!cashAccount || !arAccount) {
            throw new Error('Chart of accounts not properly seeded for this tenant');
        }
        const paidAt = dto.paidAt ? new Date(dto.paidAt) : new Date();
        return this.prisma.$transaction(async (tx) => {
            const payment = await tx.payment.create({
                data: {
                    tenantId,
                    invoiceId: dto.invoiceId,
                    amount: dto.amount,
                    method: dto.method || 'BANK_TRANSFER',
                    paidAt,
                },
                include: { invoice: true },
            });
            await tx.invoice.update({
                where: { id: dto.invoiceId },
                data: {
                    status: 'PAID',
                    paidAt,
                },
            });
            await tx.journalEntry.create({
                data: {
                    tenantId,
                    date: paidAt,
                    description: `Payment received for invoice ${dto.invoiceId}`,
                    referenceType: 'PAYMENT',
                    referenceId: payment.id,
                    lines: {
                        create: [
                            {
                                accountId: cashAccount.id,
                                debit: dto.amount,
                                credit: 0,
                            },
                            {
                                accountId: arAccount.id,
                                debit: 0,
                                credit: dto.amount,
                            },
                        ],
                    },
                },
            });
            return payment;
        });
    }
    async findAll(tenantId) {
        return this.prisma.payment.findMany({
            where: { tenantId },
            include: { invoice: { include: { customer: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map