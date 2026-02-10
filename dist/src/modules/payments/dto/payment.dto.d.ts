export declare class CreatePaymentDto {
    invoiceId: string;
    amount: number;
    method?: string;
    paidAt?: string;
}
export declare class PaymentResponseDto {
    id: string;
    amount: any;
    method: string;
    paidAt: Date;
    invoice?: any;
}
