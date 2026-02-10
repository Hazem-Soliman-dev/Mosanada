import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    // Check if email already exists
    const existingUser = await this.prisma.user.findFirst({
      where: { email: dto.email },
    });
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Create tenant, user, and seed chart of accounts in a transaction
    const result = await this.prisma.$transaction(async (tx) => {
      // 1. Create Tenant
      const tenant = await tx.tenant.create({
        data: { name: dto.companyName },
      });

      // 2. Create Admin User
      const user = await tx.user.create({
        data: {
          tenantId: tenant.id,
          email: dto.email,
          password: hashedPassword,
          role: 'ADMIN',
        },
      });

      // 3. Seed Chart of Accounts
      await tx.account.createMany({
        data: [
          { tenantId: tenant.id, code: '1001', name: 'Cash', type: 'ASSET', normalBalance: 'DEBIT' },
          { tenantId: tenant.id, code: '1002', name: 'Accounts Receivable', type: 'ASSET', normalBalance: 'DEBIT' },
          { tenantId: tenant.id, code: '2001', name: 'Deferred Revenue', type: 'LIABILITY', normalBalance: 'CREDIT' },
          { tenantId: tenant.id, code: '4001', name: 'Subscription Revenue', type: 'REVENUE', normalBalance: 'CREDIT' },
        ],
      });

      return { tenant, user };
    });

    const payload = {
      userId: result.user.id,
      tenantId: result.tenant.id,
      role: result.user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      userId: result.user.id,
      tenantId: result.tenant.id,
      role: result.user.role,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      userId: user.id,
      tenantId: user.tenantId,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      userId: user.id,
      tenantId: user.tenantId,
      role: user.role,
    };
  }
}
