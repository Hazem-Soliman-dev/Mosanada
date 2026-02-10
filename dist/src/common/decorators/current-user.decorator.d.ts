export interface JwtPayload {
    userId: string;
    tenantId: string;
    role: string;
}
export declare const CurrentUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
