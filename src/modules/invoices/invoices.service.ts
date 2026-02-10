import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';


@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  /**
   * Generate invoices for all active subscriptions in the tenant.
   * IDEMPOTENT: Uses the unique constraint [subscriptionId, periodStart, periodEnd]
   * to skip already-generated invoices.
   *
   * For each new invoice, creates a journal entry:
   *   DR  Accounts Receivable  $X
   *   CR  Deferred Revenue     $X
   */
  async generateInvoices(tenantId: string) {
    const activeSubscriptions = await this.prisma.subscription.findMany({
      where: { tenantId, status: 'ACTIVE' },
      include: { plan: true },
    });

    // Get tenant's chart of accounts
    const accounts = await this.prisma.account.findMany({
      where: { tenantId },
    });
    const arAccount = accounts.find((a) => a.code === '1002'); // Accounts Receivable
    const deferredRevenueAccount = accounts.find((a) => a.code === '2001'); // Deferred Revenue

    if (!arAccount || !deferredRevenueAccount) {
      throw new Error('Chart of accounts not properly seeded for this tenant');
    }

    let generated = 0;
    let skipped = 0;
    const newInvoices: any[] = [];

    for (const sub of activeSubscriptions) {
      const periodStart = sub.currentPeriodStart;
      const periodEnd = sub.currentPeriodEnd;

      // Check for existing invoice (idempotency)
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

      // Create invoice + journal entry in a transaction
      const result = await this.prisma.$transaction(async (tx) => {
        // Due date = 15 days from now
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

        // Create journal entry: DR AR, CR Deferred Revenue
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

  async findAll(tenantId: string) {
    return this.prisma.invoice.findMany({
      where: { tenantId },
      include: { subscription: { include: { plan: true } }, customer: true, payments: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(tenantId: string, id: string) {
    const invoice = await this.prisma.invoice.findFirst({
      where: { id, tenantId },
      include: { subscription: { include: { plan: true } }, customer: true, payments: true },
    });
    if (!invoice) throw new NotFoundException('Invoice not found');
    return invoice;
  }
}
