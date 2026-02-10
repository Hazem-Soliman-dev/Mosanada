import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Income Statement:
   * Calculates revenue for a given date range by summing journal entry lines
   * that credit revenue accounts within the period.
   */
  async getIncomeStatement(tenantId: string, startDate: string, endDate: string) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    // Get revenue account(s)
    const revenueAccounts = await this.prisma.account.findMany({
      where: { tenantId, type: 'REVENUE' },
    });
    const revenueAccountIds = revenueAccounts.map((a) => a.id);

    // Get expense account(s) — in case any exist
    const expenseAccounts = await this.prisma.account.findMany({
      where: { tenantId, type: 'EXPENSE' },
    });
    const expenseAccountIds = expenseAccounts.map((a) => a.id);

    // Sum revenue (credits - debits on revenue accounts)
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

    // Sum expenses (debits - credits on expense accounts)
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

  /**
   * Balance Sheet:
   * Calculates account balances as of a given date by summing all journal entry
   * lines up to and including that date.
   */
  async getBalanceSheet(tenantId: string, asOfDate: string) {
    const date = new Date(asOfDate);
    date.setHours(23, 59, 59, 999);

    const accounts = await this.prisma.account.findMany({
      where: { tenantId },
    });

    const balances: Record<string, number> = {};

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
        } else {
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
    // Retained earnings = net income = revenue (for this simple model)
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
}
