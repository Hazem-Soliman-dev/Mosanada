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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../../prisma/prisma.service");
let AuthService = class AuthService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async register(dto) {
        const existingUser = await this.prisma.user.findFirst({
            where: { email: dto.email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('Email already registered');
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const result = await this.prisma.$transaction(async (tx) => {
            const tenant = await tx.tenant.create({
                data: { name: dto.companyName },
            });
            const user = await tx.user.create({
                data: {
                    tenantId: tenant.id,
                    email: dto.email,
                    password: hashedPassword,
                    role: 'ADMIN',
                },
            });
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
    async login(dto) {
        const user = await this.prisma.user.findFirst({
            where: { email: dto.email },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(dto.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map