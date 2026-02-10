"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Mosanada SaaS')
        .setDescription(`Multi-tenant SaaS backend for subscription management with double-entry bookkeeping and deferred revenue recognition.\n\n` +
        `## Quick Start\n` +
        `1. **Register** a tenant via POST /api/auth/register\n` +
        `2. 🔑 **Token is set automatically** — no copy-paste needed!\n` +
        `3. Create a **Plan**, then a **Customer**, then a **Subscription**\n` +
        `4. **Generate Invoices** → Record **Payment** → **Recognize Revenue**\n` +
        `5. Check **Reports** (Income Statement & Balance Sheet)\n`)
        .setVersion('1.0.0')
        .setLicense('MIT', 'https://opensource.org/licenses/MIT')
        .addBearerAuth()
        .addTag('Auth', 'Register tenant & login')
        .addTag('Plans', 'Manage subscription plans')
        .addTag('Customers', 'Manage customers')
        .addTag('Subscriptions', 'Manage subscriptions')
        .addTag('Billing', 'Generate invoices')
        .addTag('Payments', 'Record payments')
        .addTag('Accounting', 'Chart of accounts, ledger, journal entries, revenue recognition')
        .addTag('Reports', 'Financial reports')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    const autoAuthScript = `
    (function () {
      const originalFetch = window.fetch;
      window.fetch = async function (...args) {
        const response = await originalFetch.apply(this, args);
        const url = typeof args[0] === 'string' ? args[0] : args[0]?.url || '';
        if (url.includes('/api/auth/register') || url.includes('/api/auth/login')) {
          try {
            const cloned = response.clone();
            const data = await cloned.json();
            if (data.access_token) {
              window.ui.preauthorizeApiKey('bearer', data.access_token);
              const banner = document.createElement('div');
              banner.textContent = '🔑 Token set automatically! You are now authorized.';
              banner.style.cssText = 'position:fixed;top:0;left:0;right:0;padding:12px;background:#48bb78;color:#fff;text-align:center;font-weight:bold;z-index:9999;font-size:14px;';
              document.body.appendChild(banner);
              setTimeout(() => banner.remove(), 4000);
            }
          } catch (e) {}
        }
        return response;
      };
    })();
  `;
    swagger_1.SwaggerModule.setup('api/docs', app, document, {
        customSiteTitle: 'Mosanada SaaS — API Docs',
        customfavIcon: 'https://nestjs.com/img/logo-small.svg',
        customJsStr: [autoAuthScript],
        swaggerOptions: {
            persistAuthorization: true,
            docExpansion: 'list',
            filter: true,
            showRequestDuration: true,
        },
    });
    const httpAdapter = app.getHttpAdapter();
    httpAdapter.get('/', (req, res) => {
        res.redirect('/api/docs');
    });
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`🚀 Mosanada SaaS is running on: http://localhost:${port}`);
    console.log(`📚 Swagger UI: http://localhost:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map