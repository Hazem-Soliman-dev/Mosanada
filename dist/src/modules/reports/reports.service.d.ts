import { PrismaService } from '../../prisma/prisma.service';
export declare class ReportsService {
    private prisma;
    constructor(prisma: PrismaService);
    getIncomeStatement(tenantId: string, startDate: string, endDate: string): Promise<{
        revenue: {
            subscriptionRevenue: number;
        };
        expenses: {
            total: number;
        } | undefined;
        netIncome: number;
    }>;
    getBalanceSheet(tenantId: string, asOfDate: string): Promise<{
        assets: {
            cash: number;
            accountsReceivable: number;
        };
        liabilities: {
            deferredRevenue: number;
        };
        equity: {
            retainedEarnings: number;
        };
        balanceCheck: boolean;
    }>;
}
