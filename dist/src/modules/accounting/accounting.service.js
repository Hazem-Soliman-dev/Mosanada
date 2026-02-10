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
exports.AccountingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let AccountingService = class AccountingService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAccounts(tenantId) {
        return this.prisma.account.findMany({
            where: { tenantId },
            orderBy: { code: 'asc' },
        });
    }
    async getLedger(tenantId, accountId) {
        const account = await this.prisma.account.findFirst({
            where: { id: accountId, tenantId },
        });
        if (!account)
            throw new common_1.NotFoundException('Account not found');
        const lines = await this.prisma.journalEntryLine.findMany({
            where: {
                accountId,
                journalEntry: { tenantId },
            },
            include: {
                journalEntry: true,
            },
            orderBy: {
                journalEntry: { date: 'asc' },
            },
        });
        let runningBalance = 0;
        const ledger = lines.map((line) => {
            const debit = parseFloat(line.debit.toString());
            const credit = parseFloat(line.credit.toString());
            if (account.normalBalance === 'DEBIT') {
                runningBalance += debit - credit;
            }
            else {
                runningBalance += credit - debit;
            }
            return {
                date: line.journalEntry.date,
                description: line.journalEntry.description,
                debit: line.debit,
                credit: line.credit,
                runningBalance: runningBalance.toFixed(2),
            };
        });
        return {
            account,
            ledger,
            balance: runningBalance.toFixed(2),
        };
    }
    async getJournalEntries(tenantId) {
        return this.prisma.journalEntry.findMany({
            where: { tenantId },
            include: {
                lines: {
                    include: { account: true },
                },
            },
            orderBy: { date: 'desc' },
        });
    }
    async recognizeRevenue(tenantId) {
        const now = new Date();
        const accounts = await this.prisma.account.findMany({
            where: { tenantId },
        });
        const deferredRevenueAccount = accounts.find((a) => a.code === '2001');
        const revenueAccount = accounts.find((a) => a.code === '4001');
        if (!deferredRevenueAccount || !revenueAccount) {
            throw new Error('Chart of accounts not properly seeded for this tenant');
        }
        const invoices = await this.prisma.invoice.findMany({
            where: {
                tenantId,
                periodEnd: { lte: now },
                status: { not: 'VOID' },
            },
        });
        const existingRecognitions = await this.prisma.journalEntry.findMany({
            where: {
                tenantId,
                referenceType: 'REVENUE_RECOGNITION',
            },
            select: { referenceId: true },
        });
        const recognizedInvoiceIds = new Set(existingRecognitions.map((e) => e.referenceId));
        let recognized = 0;
        let skipped = 0;
        let totalAmount = 0;
        for (const invoice of invoices) {
            if (recognizedInvoiceIds.has(invoice.id)) {
                skipped++;
                continue;
            }
            await this.prisma.$transaction(async (tx) => {
                await tx.journalEntry.create({
                    data: {
                        tenantId,
                        date: now,
                        description: `Revenue recognized for invoice ${invoice.id}`,
                        referenceType: 'REVENUE_RECOGNITION',
                        referenceId: invoice.id,
                        lines: {
                            create: [
                                {
                                    accountId: deferredRevenueAccount.id,
                                    debit: invoice.amount,
                                    credit: 0,
                                },
                                {
                                    accountId: revenueAccount.id,
                                    debit: 0,
                                    credit: invoice.amount,
                                },
                            ],
                        },
                    },
                });
            });
            totalAmount += parseFloat(invoice.amount.toString());
            recognized++;
        }
        return {
            recognized,
            skipped,
            totalAmount: totalAmount.toFixed(2),
        };
    }
};
exports.AccountingService = AccountingService;
exports.AccountingService = AccountingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AccountingService);
//# sourceMappingURL=accounting.service.js.map