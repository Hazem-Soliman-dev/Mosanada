import { PlansService } from './plans.service';
import { CreatePlanDto, UpdatePlanDto } from './dto/plan.dto';
export declare class PlansController {
    private plansService;
    constructor(plansService: PlansService);
    create(tenantId: string, dto: CreatePlanDto): Promise<{
        tenantId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        price: import("@prisma/client/runtime/library").Decimal;
        billingCycle: import(".prisma/client").$Enums.BillingCycle;
        isActive: boolean;
    }>;
    findAll(tenantId: string): Promise<{
        tenantId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        price: import("@prisma/client/runtime/library").Decimal;
        billingCycle: import(".prisma/client").$Enums.BillingCycle;
        isActive: boolean;
    }[]>;
    findOne(tenantId: string, id: string): Promise<{
        tenantId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        price: import("@prisma/client/runtime/library").Decimal;
        billingCycle: import(".prisma/client").$Enums.BillingCycle;
        isActive: boolean;
    }>;
    update(tenantId: string, id: string, dto: UpdatePlanDto): Promise<{
        tenantId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        price: import("@prisma/client/runtime/library").Decimal;
        billingCycle: import(".prisma/client").$Enums.BillingCycle;
        isActive: boolean;
    }>;
    remove(tenantId: string, id: string): Promise<{
        tenantId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        price: import("@prisma/client/runtime/library").Decimal;
        billingCycle: import(".prisma/client").$Enums.BillingCycle;
        isActive: boolean;
    }>;
}
