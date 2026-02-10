import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(dto: RegisterDto): Promise<{
        access_token: string;
        userId: string;
        tenantId: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
        userId: string;
        tenantId: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
}
