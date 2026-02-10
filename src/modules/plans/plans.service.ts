import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePlanDto, UpdatePlanDto } from './dto/plan.dto';

@Injectable()
export class PlansService {
  constructor(private prisma: PrismaService) {}

  async create(tenantId: string, dto: CreatePlanDto) {
    return this.prisma.plan.create({
      data: {
        tenantId,
        name: dto.name,
        price: dto.price,
        billingCycle: (dto.billingCycle as any) || 'MONTHLY',
        isActive: dto.isActive ?? true,
      },
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.plan.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(tenantId: string, id: string) {
    const plan = await this.prisma.plan.findFirst({
      where: { id, tenantId },
    });
    if (!plan) throw new NotFoundException('Plan not found');
    return plan;
  }

  async update(tenantId: string, id: string, dto: UpdatePlanDto) {
    await this.findOne(tenantId, id);
    return this.prisma.plan.update({
      where: { id },
      data: {
        ...(dto.name && { name: dto.name }),
        ...(dto.price !== undefined && { price: dto.price }),
        ...(dto.billingCycle && { billingCycle: dto.billingCycle as any }),
        ...(dto.isActive !== undefined && { isActive: dto.isActive }),
      },
    });
  }

  async remove(tenantId: string, id: string) {
    await this.findOne(tenantId, id);
    return this.prisma.plan.delete({ where: { id } });
  }
}
