import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSubscriptionDto } from './dto/subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(private prisma: PrismaService) {}

  async create(tenantId: string, dto: CreateSubscriptionDto) {
    // Validate customer belongs to tenant
    const customer = await this.prisma.customer.findFirst({
      where: { id: dto.customerId, tenantId },
    });
    if (!customer) throw new NotFoundException('Customer not found');

    // Validate plan belongs to tenant
    const plan = await this.prisma.plan.findFirst({
      where: { id: dto.planId, tenantId, isActive: true },
    });
    if (!plan) throw new NotFoundException('Plan not found or inactive');

    const startDate = dto.startDate ? new Date(dto.startDate) : new Date();
    const periodStart = new Date(startDate);
    const periodEnd = new Date(startDate);

    // Calculate period end based on billing cycle
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

  async findAll(tenantId: string) {
    return this.prisma.subscription.findMany({
      where: { tenantId },
      include: { customer: true, plan: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(tenantId: string, id: string) {
    const sub = await this.prisma.subscription.findFirst({
      where: { id, tenantId },
      include: { customer: true, plan: true, invoices: true },
    });
    if (!sub) throw new NotFoundException('Subscription not found');
    return sub;
  }

  async cancel(tenantId: string, id: string) {
    const sub = await this.prisma.subscription.findFirst({
      where: { id, tenantId },
    });
    if (!sub) throw new NotFoundException('Subscription not found');
    if (sub.status === 'CANCELLED') {
      throw new BadRequestException('Subscription is already cancelled');
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
}
