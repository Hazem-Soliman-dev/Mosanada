export declare class IncomeStatementQueryDto {
    startDate: string;
    endDate: string;
}
export declare class BalanceSheetQueryDto {
    asOfDate: string;
}
export declare class IncomeStatementResponseDto {
    revenue: {
        subscriptionRevenue: number;
    };
    netIncome: number;
}
export declare class BalanceSheetResponseDto {
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
}
