import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/subscription.dto';
export declare class SubscriptionsController {
    private subscriptionsService;
    constructor(subscriptionsService: SubscriptionsService);
    create(tenantId: string, dto: CreateSubscriptionDto): Promise<{
        plan: {
            tenantId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            price: import("@prisma/client/runtime/library").Decimal;
            billingCycle: import(".prisma/client").$Enums.BillingCycle;
            isActive: boolean;
        };
        customer: {
            email: string;
            tenantId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            phone: string | null;
        };
    } & {
        tenantId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
        planId: string;
        startDate: Date;
        status: import(".prisma/client").$Enums.SubscriptionStatus;
        currentPeriodStart: Date;
        currentPeriodEnd: Date;
        cancelledAt: Date | null;
    }>;
    findAll(tenantId: string): Promise<({
        plan: {
            tenantId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            price: import("@prisma/client/runtime/library").Decimal;
            billingCycle: import(".prisma/client").$Enums.BillingCycle;
            isActive: boolean;
        };
        customer: {
            email: string;
            tenantId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            phone: string | null;
        };
    } & {
        tenantId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
        planId: string;
        startDate: Date;
        status: import(".prisma/client").$Enums.SubscriptionStatus;
        currentPeriodStart: Date;
        currentPeriodEnd: Date;
        cancelledAt: Date | null;
    })[]>;
    findOne(tenantId: string, id: string): Promise<{
        plan: {
            tenantId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            price: import("@prisma/client/runtime/library").Decimal;
            billingCycle: import(".prisma/client").$Enums.BillingCycle;
            isActive: boolean;
        };
        customer: {
            email: string;
            tenantId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            phone: string | null;
        };
        invoices: {
            tenantId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            customerId: string;
            status: import(".prisma/client").$Enums.InvoiceStatus;
            subscriptionId: string;
            amount: import("@prisma/client/runtime/library").Decimal;
            periodStart: Date;
            periodEnd: Date;
            dueDate: Date;
            paidAt: Date | null;
        }[];
    } & {
        tenantId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
        planId: string;
        startDate: Date;
        status: import(".prisma/client").$Enums.SubscriptionStatus;
        currentPeriodStart: Date;
        currentPeriodEnd: Date;
        cancelledAt: Date | null;
    }>;
    cancel(tenantId: string, id: string): Promise<{
        plan: {
            tenantId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            price: import("@prisma/client/runtime/library").Decimal;
            billingCycle: import(".prisma/client").$Enums.BillingCycle;
            isActive: boolean;
        };
        customer: {
            email: string;
            tenantId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            phone: string | null;
        };
    } & {
        tenantId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
        planId: string;
        startDate: Date;
        status: import(".prisma/client").$Enums.SubscriptionStatus;
        currentPeriodStart: Date;
        currentPeriodEnd: Date;
        cancelledAt: Date | null;
    }>;
}
