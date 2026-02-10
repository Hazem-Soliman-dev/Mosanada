import { ReportsService } from './reports.service';
export declare class ReportsController {
    private reportsService;
    constructor(reportsService: ReportsService);
    incomeStatement(tenantId: string, startDate: string, endDate: string): Promise<{
        revenue: {
            subscriptionRevenue: number;
        };
        expenses: {
            total: number;
        } | undefined;
        netIncome: number;
    }>;
    balanceSheet(tenantId: string, asOfDate: string): Promise<{
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
