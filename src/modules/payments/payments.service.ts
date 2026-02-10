import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePaymentDto } from './dto/payment.dto';


@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Record a payment against an invoice.
   * Creates journal entry:
   *   DR  Cash                 $X
   *   CR  Accounts Receivable  $X
   * Updates invoice status to PAID.
   */
  async create(tenantId: string, dto: CreatePaymentDto) {
    // Validate invoice belongs to tenant
    const invoice = await this.prisma.invoice.findFirst({
      where: { id: dto.invoiceId, tenantId },
    });
    if (!invoice) throw new NotFoundException('Invoice not found');
    if (invoice.status === 'PAID') {
      throw new BadRequestException('Invoice is already paid');
    }

    // Get accounts
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
      // Create payment
      const payment = await tx.payment.create({
        data: {
          tenantId,
          invoiceId: dto.invoiceId,
          amount: dto.amount,
          method: (dto.method as any) || 'BANK_TRANSFER',
          paidAt,
        },
        include: { invoice: true },
      });

      // Update invoice status
      await tx.invoice.update({
        where: { id: dto.invoiceId },
        data: {
          status: 'PAID',
          paidAt,
        },
      });

      // Create journal entry: DR Cash, CR AR
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

  async findAll(tenantId: string) {
    return this.prisma.payment.findMany({
      where: { tenantId },
      include: { invoice: { include: { customer: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }
}
