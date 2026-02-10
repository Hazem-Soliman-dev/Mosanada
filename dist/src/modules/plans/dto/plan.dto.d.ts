export declare class CreatePlanDto {
    name: string;
    price: number;
    billingCycle?: string;
    isActive?: boolean;
}
export declare class UpdatePlanDto {
    name?: string;
    price?: number;
    billingCycle?: string;
    isActive?: boolean;
}
export declare class PlanResponseDto {
    id: string;
    name: string;
    price: any;
    billingCycle: string;
    isActive: boolean;
    createdAt: Date;
}
