import { PrismaService } from '../../prisma/prisma.service';
export declare class AccountingService {
    private prisma;
    constructor(prisma: PrismaService);
    getAccounts(tenantId: string): Promise<{
        type: import(".prisma/client").$Enums.AccountType;
        tenantId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        code: string;
        normalBalance: import(".prisma/client").$Enums.NormalBalance;
    }[]>;
    getLedger(tenantId: string, accountId: string): Promise<{
        account: {
            type: import(".prisma/client").$Enums.AccountType;
            tenantId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            code: string;
            normalBalance: import(".prisma/client").$Enums.NormalBalance;
        };
        ledger: {
            date: Date;
            description: string;
            debit: import("@prisma/client/runtime/library").Decimal;
            credit: import("@prisma/client/runtime/library").Decimal;
            runningBalance: string;
        }[];
        balance: string;
    }>;
    getJournalEntries(tenantId: string): Promise<({
        lines: ({
            account: {
                type: import(".prisma/client").$Enums.AccountType;
                tenantId: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                code: string;
                normalBalance: import(".prisma/client").$Enums.NormalBalance;
            };
        } & {
            id: string;
            debit: import("@prisma/client/runtime/library").Decimal;
            credit: import("@prisma/client/runtime/library").Decimal;
            accountId: string;
            journalEntryId: string;
        })[];
    } & {
        description: string;
        tenantId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        referenceType: string;
        referenceId: string;
    })[]>;
    recognizeRevenue(tenantId: string): Promise<{
        recognized: number;
        skipped: number;
        totalAmount: string;
    }>;
}
