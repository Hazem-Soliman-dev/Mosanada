export declare class CreateSubscriptionDto {
    customerId: string;
    planId: string;
    startDate?: string;
}
export declare class SubscriptionResponseDto {
    id: string;
    status: string;
    startDate: Date;
    currentPeriodStart: Date;
    currentPeriodEnd: Date;
    cancelledAt?: Date;
    customer?: any;
    plan?: any;
}
