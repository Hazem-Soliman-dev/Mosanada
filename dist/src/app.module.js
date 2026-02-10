"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./modules/auth/auth.module");
const plans_module_1 = require("./modules/plans/plans.module");
const customers_module_1 = require("./modules/customers/customers.module");
const subscriptions_module_1 = require("./modules/subscriptions/subscriptions.module");
const invoices_module_1 = require("./modules/invoices/invoices.module");
const payments_module_1 = require("./modules/payments/payments.module");
const accounting_module_1 = require("./modules/accounting/accounting.module");
const reports_module_1 = require("./modules/reports/reports.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            plans_module_1.PlansModule,
            customers_module_1.CustomersModule,
            subscriptions_module_1.SubscriptionsModule,
            invoices_module_1.InvoicesModule,
            payments_module_1.PaymentsModule,
            accounting_module_1.AccountingModule,
            reports_module_1.ReportsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map