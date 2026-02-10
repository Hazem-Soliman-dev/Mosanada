import { PrismaService } from '../../prisma/prisma.service';
export declare class InvoicesService {
    private prisma;
    constructor(prisma: PrismaService);
    generateInvoices(tenantId: string): Promise<{
        generated: number;
        skipped: number;
        invoices: any[];
    }>;
    findAll(tenantId: string): Promise<({
        customer: {
            email: string;
            tenantId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            phone: string | null;
        };
        subscription: {
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
        };
        payments: {
            tenantId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            amount: import("@prisma/client/runtime/library").Decimal;
            paidAt: Date;
            invoiceId: string;
            method: import(".prisma/client").$Enums.PaymentMethod;
        }[];
    } & {
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
    })[]>;
    findOne(tenantId: string, id: string): Promise<{
        customer: {
            email: string;
            tenantId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            phone: string | null;
        };
        subscription: {
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
        };
        payments: {
            tenantId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            amount: import("@prisma/client/runtime/library").Decimal;
            paidAt: Date;
            invoiceId: string;
            method: import(".prisma/client").$Enums.PaymentMethod;
        }[];
    } & {
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
    }>;
}
