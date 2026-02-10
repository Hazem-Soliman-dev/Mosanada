import { CustomersService } from './customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
export declare class CustomersController {
    private customersService;
    constructor(customersService: CustomersService);
    create(tenantId: string, dto: CreateCustomerDto): Promise<{
        email: string;
        tenantId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        phone: string | null;
    }>;
    findAll(tenantId: string): Promise<{
        email: string;
        tenantId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        phone: string | null;
    }[]>;
    findOne(tenantId: string, id: string): Promise<{
        email: string;
        tenantId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        phone: string | null;
    }>;
    update(tenantId: string, id: string, dto: UpdateCustomerDto): Promise<{
        email: string;
        tenantId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        phone: string | null;
    }>;
    remove(tenantId: string, id: string): Promise<{
        email: string;
        tenantId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        phone: string | null;
    }>;
}
