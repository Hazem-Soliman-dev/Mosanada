export declare class RegisterDto {
    companyName: string;
    email: string;
    password: string;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class AuthResponseDto {
    access_token: string;
    userId: string;
    tenantId: string;
    role: string;
}
