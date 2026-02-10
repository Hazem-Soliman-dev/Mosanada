export declare class CreateCustomerDto {
    name: string;
    email: string;
    phone?: string;
}
export declare class UpdateCustomerDto {
    name?: string;
    email?: string;
    phone?: string;
}
export declare class CustomerResponseDto {
    id: string;
    name: string;
    email: string;
    phone?: string;
    createdAt: Date;
}
