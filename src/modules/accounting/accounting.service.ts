import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AccountingService {
  constructor(private prisma: PrismaService) {}

  // ─── Chart of Accounts ──────────────────────────────────

  async getAccounts(tenantId: string) {
    return this.prisma.account.findMany({
      where: { tenantId },
      orderBy: { code: 'asc' },
    });
  }

  // ─── Ledger for One Account ─────────────────────────────

  async getLedger(tenantId: string, accountId: string) {
    const account = await this.prisma.account.findFirst({
      where: { id: accountId, tenantId },
    });
    if (!account) throw new NotFoundException('Account not found');

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

      // For DEBIT normal accounts: balance = debits - credits
      // For CREDIT normal accounts: balance = credits - debits
      if (account.normalBalance === 'DEBIT') {
        runningBalance += debit - credit;
      } else {
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

  // ─── Journal Entries ────────────────────────────────────

  async getJournalEntries(tenantId: string) {
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

  // ─── Revenue Recognition ───────────────────────────────

  /**
   * End-of-month revenue recognition. IDEMPOTENT.
   * For invoices whose period has ended (periodEnd <= now) and
   * haven't been recognized yet (no REVENUE_RECOGNITION journal entry),
   * creates:
   *   DR  Deferred Revenue     $X
   *   CR  Subscription Revenue  $X
   */
  async recognizeRevenue(tenantId: string) {
    const now = new Date();

    // Get accounts
    const accounts = await this.prisma.account.findMany({
      where: { tenantId },
    });
    const deferredRevenueAccount = accounts.find((a) => a.code === '2001');
    const revenueAccount = accounts.find((a) => a.code === '4001');

    if (!deferredRevenueAccount || !revenueAccount) {
      throw new Error('Chart of accounts not properly seeded for this tenant');
    }

    // Find all invoices with periodEnd <= now that belong to this tenant
    const invoices = await this.prisma.invoice.findMany({
      where: {
        tenantId,
        periodEnd: { lte: now },
        status: { not: 'VOID' },
      },
    });

    // Find which invoices already have a revenue recognition journal entry
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
        // Create journal entry: DR Deferred Revenue, CR Subscription Revenue
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
}
