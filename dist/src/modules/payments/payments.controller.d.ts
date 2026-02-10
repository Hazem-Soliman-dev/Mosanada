import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/payment.dto';
export declare class PaymentsController {
    private paymentsService;
    constructor(paymentsService: PaymentsService);
    create(tenantId: string, dto: CreatePaymentDto): Promise<{
        invoice: {
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
        };
    } & {
        tenantId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        amount: import("@prisma/client/runtime/library").Decimal;
        paidAt: Date;
        invoiceId: string;
        method: import(".prisma/client").$Enums.PaymentMethod;
    }>;
    findAll(tenantId: string): Promise<({
        invoice: {
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
            status: import(".prisma/client").$Enums.InvoiceStatus;
            subscriptionId: string;
            amount: import("@prisma/client/runtime/library").Decimal;
            periodStart: Date;
            periodEnd: Date;
            dueDate: Date;
            paidAt: Date | null;
        };
    } & {
        tenantId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        amount: import("@prisma/client/runtime/library").Decimal;
        paidAt: Date;
        invoiceId: string;
        method: import(".prisma/client").$Enums.PaymentMethod;
    })[]>;
}
