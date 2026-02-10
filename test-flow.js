const http = require('http');

const API_URL = 'http://localhost:3000';
let token = '';
let tenantId = '';
let planId = '';
let customerId = '';
let subscriptionId = '';
let invoiceId = '';

async function request(method, path, body = null, authToken = null) {
  return new Promise((resolve, reject) => {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (authToken) {
      options.headers['Authorization'] = `Bearer ${authToken}`;
    }

    const req = http.request(`${API_URL}${path}`, options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({ status: res.statusCode, body: json });
        } catch (e) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function run() {
  try {
    console.log('--- 1. Register Tenant ---');
    const registerRes = await request('POST', '/api/auth/register', {
      companyName: 'Test Corp ' + Date.now(),
      email: `admin${Date.now()}@test.com`,
      password: 'StrongPass123!',
    });
    console.log('Register Status:', registerRes.status);
    if (registerRes.status !== 201) throw new Error('Registration failed');
    token = registerRes.body.access_token;
    tenantId = registerRes.body.tenantId;
    console.log('Token received. Tenant ID:', tenantId);

    console.log('\n--- 2. Create Plan ---');
    const planRes = await request('POST', '/api/plans', {
      name: 'Pro Plan',
      price: 500,
      billingCycle: 'MONTHLY',
    }, token);
    console.log('Plan Status:', planRes.status);
    planId = planRes.body.id;
    console.log('Plan ID:', planId);

    console.log('\n--- 3. Create Customer ---');
    const customerRes = await request('POST', '/api/customers', {
      name: 'John Doe',
      email: `john${Date.now()}@example.com`,
    }, token);
    console.log('Customer Status:', customerRes.status);
    customerId = customerRes.body.id;
    console.log('Customer ID:', customerId);

    console.log('\n--- 4. Create Subscription ---');
    const subRes = await request('POST', '/api/subscriptions', {
      customerId,
      planId,
    }, token);
    console.log('Subscription Status:', subRes.status);
    subscriptionId = subRes.body.id;
    console.log('Subscription ID:', subscriptionId);

    console.log('\n--- 5. Generate Invoices ---');
    const invRes = await request('POST', '/api/billing/generate-invoices', {}, token);
    console.log('Generate Invoices Status:', invRes.status);
    console.log('Generated:', invRes.body.generated);
    if (invRes.body.generated > 0) {
      invoiceId = invRes.body.invoices[0].id;
      console.log('Invoice ID:', invoiceId);
    } else {
      // Fetch latest invoice if generated count is 0 (idempotency)
      const listInv = await request('GET', '/api/invoices', null, token);
      invoiceId = listInv.body[0].id;
      console.log('Existing Invoice ID:', invoiceId);
    }

    console.log('\n--- 6. Record Payment ---');
    const payRes = await request('POST', '/api/payments', {
      invoiceId,
      amount: 500,
      method: 'BANK_TRANSFER',
    }, token);
    console.log('Payment Status:', payRes.status);

    console.log('\n--- 7. Recognize Revenue ---');
    // Force invoice period end to be in the past ideally, but for now just run it
    const revRes = await request('POST', '/api/accounting/recognize-revenue', {}, token);
    console.log('Revenue Recognition Status:', revRes.status);
    console.log('Recognized Count:', revRes.body.recognized);

    console.log('\n--- 8. Check Reports ---');
    const bsRes = await request('GET', `/api/reports/balance-sheet?asOfDate=${new Date().toISOString().split('T')[0]}`, null, token);
    console.log('Balance Sheet Status:', bsRes.status);
    console.log('Balance Check:', bsRes.body.balanceCheck);
    console.log('Assets:', bsRes.body.assets);
    console.log('Liabilities:', bsRes.body.liabilities);
    console.log('Equity:', bsRes.body.equity);

  } catch (err) {
    console.error('Test Failed:', err);
    process.exit(1);
  }
}

run();
