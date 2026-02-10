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
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ReportsService = class ReportsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getIncomeStatement(tenantId, startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        const revenueAccounts = await this.prisma.account.findMany({
            where: { tenantId, type: 'REVENUE' },
        });
        const revenueAccountIds = revenueAccounts.map((a) => a.id);
        const expenseAccounts = await this.prisma.account.findMany({
            where: { tenantId, type: 'EXPENSE' },
        });
        const expenseAccountIds = expenseAccounts.map((a) => a.id);
        const revenueLines = await this.prisma.journalEntryLine.findMany({
            where: {
                accountId: { in: revenueAccountIds },
                journalEntry: {
                    tenantId,
                    date: { gte: start, lte: end },
                },
            },
        });
        let subscriptionRevenue = 0;
        for (const line of revenueLines) {
            subscriptionRevenue += parseFloat(line.credit.toString()) - parseFloat(line.debit.toString());
        }
        const expenseLines = await this.prisma.journalEntryLine.findMany({
            where: {
                accountId: { in: expenseAccountIds },
                journalEntry: {
                    tenantId,
                    date: { gte: start, lte: end },
                },
            },
        });
        let totalExpenses = 0;
        for (const line of expenseLines) {
            totalExpenses += parseFloat(line.debit.toString()) - parseFloat(line.credit.toString());
        }
        const netIncome = subscriptionRevenue - totalExpenses;
        return {
            revenue: {
                subscriptionRevenue,
            },
            expenses: totalExpenses > 0 ? { total: totalExpenses } : undefined,
            netIncome,
        };
    }
    async getBalanceSheet(tenantId, asOfDate) {
        const date = new Date(asOfDate);
        date.setHours(23, 59, 59, 999);
        const accounts = await this.prisma.account.findMany({
            where: { tenantId },
        });
        const balances = {};
        for (const account of accounts) {
            const lines = await this.prisma.journalEntryLine.findMany({
                where: {
                    accountId: account.id,
                    journalEntry: {
                        tenantId,
                        date: { lte: date },
                    },
                },
            });
            let balance = 0;
            for (const line of lines) {
                const debit = parseFloat(line.debit.toString());
                const credit = parseFloat(line.credit.toString());
                if (account.normalBalance === 'DEBIT') {
                    balance += debit - credit;
                }
                else {
                    balance += credit - debit;
                }
            }
            balances[account.code] = balance;
        }
        const cash = balances['1001'] || 0;
        const accountsReceivable = balances['1002'] || 0;
        const deferredRevenue = balances['2001'] || 0;
        const subscriptionRevenue = balances['4001'] || 0;
        const totalAssets = cash + accountsReceivable;
        const totalLiabilities = deferredRevenue;
        const retainedEarnings = subscriptionRevenue;
        const totalEquity = retainedEarnings;
        const balanceCheck = Math.abs(totalAssets - (totalLiabilities + totalEquity)) < 0.01;
        return {
            assets: {
                cash,
                accountsReceivable,
            },
            liabilities: {
                deferredRevenue,
            },
            equity: {
                retainedEarnings,
            },
            balanceCheck,
        };
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReportsService);
//# sourceMappingURL=reports.service.js.map