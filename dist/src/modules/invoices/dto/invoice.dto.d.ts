export declare class InvoiceResponseDto {
    id: string;
    amount: any;
    status: string;
    periodStart: Date;
    periodEnd: Date;
    dueDate: Date;
    paidAt?: Date;
    subscription?: any;
    customer?: any;
}
export declare class GenerateInvoicesResponseDto {
    generated: number;
    skipped: number;
    invoices: InvoiceResponseDto[];
}
