export declare class AccountResponseDto {
    id: string;
    code: string;
    name: string;
    type: string;
    normalBalance: string;
}
export declare class JournalEntryLineResponseDto {
    id: string;
    debit: any;
    credit: any;
    account?: AccountResponseDto;
}
export declare class JournalEntryResponseDto {
    id: string;
    date: Date;
    description: string;
    referenceType: string;
    referenceId: string;
    lines: JournalEntryLineResponseDto[];
}
export declare class LedgerEntryDto {
    date: Date;
    description: string;
    debit: any;
    credit: any;
    runningBalance: any;
}
export declare class RevenueRecognitionResponseDto {
    recognized: number;
    skipped: number;
    totalAmount: string;
}
