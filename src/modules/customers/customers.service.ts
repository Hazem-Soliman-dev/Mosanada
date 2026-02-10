import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async create(tenantId: string, dto: CreateCustomerDto) {
    const existing = await this.prisma.customer.findUnique({
      where: { tenantId_email: { tenantId, email: dto.email } },
    });
    if (existing) {
      throw new ConflictException('Customer with this email already exists');
    }

    return this.prisma.customer.create({
      data: {
        tenantId,
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
      },
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.customer.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(tenantId: string, id: string) {
    const customer = await this.prisma.customer.findFirst({
      where: { id, tenantId },
    });
    if (!customer) throw new NotFoundException('Customer not found');
    return customer;
  }

  async update(tenantId: string, id: string, dto: UpdateCustomerDto) {
    await this.findOne(tenantId, id);
    if (dto.email) {
      const existing = await this.prisma.customer.findFirst({
        where: { tenantId, email: dto.email, NOT: { id } },
      });
      if (existing) {
        throw new ConflictException('Another customer with this email already exists');
      }
    }
    return this.prisma.customer.update({
      where: { id },
      data: {
        ...(dto.name && { name: dto.name }),
        ...(dto.email && { email: dto.email }),
        ...(dto.phone !== undefined && { phone: dto.phone }),
      },
    });
  }

  async remove(tenantId: string, id: string) {
    await this.findOne(tenantId, id);
    return this.prisma.customer.delete({ where: { id } });
  }
}
