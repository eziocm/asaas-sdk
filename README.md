# @eziocm/asaas-sdk

> TypeScript SDK for Asaas Payment Gateway API v3 - Complete, type-safe, and production-ready

[![npm version](https://img.shields.io/npm/v/@eziocm/asaas-sdk.svg)](https://www.npmjs.com/package/@eziocm/asaas-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)

## 🚀 Features

- ✅ **Full TypeScript Support** - Complete type definitions with IntelliSense
- ✅ **13 API Modules** - Comprehensive coverage of Asaas API v3
- ✅ **Zero Dependencies** - Lightweight and secure
- ✅ **Promise-based** - Modern async/await API
- ✅ **Error Handling** - Detailed error messages and types
- ✅ **Environment Support** - Sandbox and production modes
- ✅ **Tree-shakeable** - Import only what you need

## 📦 Installation

```bash
npm install @eziocm/asaas-sdk
```

## 🎯 Quick Start

```typescript
import { AsaasSDK } from '@eziocm/asaas-sdk';

// Initialize the SDK
const asaas = new AsaasSDK({
  apiKey: process.env.ASAAS_API_KEY!,
  environment: 'sandbox', // or 'production'
});

// Create a customer
const customer = await asaas.customers.create({
  name: 'João da Silva',
  email: 'joao@example.com',
  cpfCnpj: '12345678901',
  mobilePhone: '11999999999',
});

// Create a PIX payment
const payment = await asaas.payments.create({
  customer: customer.id,
  billingType: 'PIX',
  value: 100.00,
  dueDate: '2024-12-31',
  description: 'Monthly subscription',
});

// Get PIX QR Code
const qrCode = await asaas.payments.getPixQrCode(payment.id);
console.log('PIX Payload:', qrCode.payload);
```

## 📚 API Modules

### Core Modules

| Module | Description | Methods |
|--------|-------------|---------|
| **customers** | Customer management | create, list, get, update, delete, restore |
| **payments** | Payment processing | create, list, get, update, PIX QR code, boleto |
| **subscriptions** | Recurring payments | create, list, get, update, delete |
| **pix** | PIX operations | keys, transactions, QR codes, automatic debit |
| **webhooks** | Event notifications | create, list, get, update, delete |

### Financial Modules

| Module | Description | Methods |
|--------|-------------|---------|
| **installments** | Payment plans | create, list, get, payments, payment book |
| **transfers** | Bank transfers | create, list, get, cancel (PIX, TED) |
| **refunds** | Payment reversals | refund payment, refund installment, list |
| **anticipations** | Cash flow | create, simulate, list, limits |
| **account** | Account management | info, balance, transactions |
| **paymentLinks** | Payment link mgmt | create, list, get, update, delete |
| **invoices** | Invoice management | create, list, get, update, cancel |
| **checkout** | Checkout config | customization, settings |
| **splits** | Payment distribution | create, list, get |

### Advanced Modules

| Module | Description | Methods |
|--------|-------------|---------|
| **subaccounts** | Multi-tenant | create, list, get, update, documents |
| **creditCard** | Card tokenization | tokenize |
| **notifications** | Settings | update, batch update |

## 💡 Usage Examples

### Customer Management

```typescript
// Create customer
const customer = await asaas.customers.create({
  name: 'João da Silva',
  email: 'joao@example.com',
  cpfCnpj: '12345678901',
  mobilePhone: '11999999999',
  address: 'Rua Exemplo',
  addressNumber: '123',
  province: 'São Paulo',
  postalCode: '01234567',
});

// List customers with filters
const customers = await asaas.customers.list({
  email: 'joao@example.com',
  limit: 10,
  offset: 0,
});

// Update customer
const updated = await asaas.customers.update(customer.id, {
  mobilePhone: '11988888888',
});
```

### Payment Processing

```typescript
// PIX Payment
const pixPayment = await asaas.payments.create({
  customer: customerId,
  billingType: 'PIX',
  value: 100.00,
  dueDate: '2024-12-31',
  description: 'Product purchase',
});

const qrCode = await asaas.payments.getPixQrCode(pixPayment.id);

// Boleto Payment
const boletoPayment = await asaas.payments.create({
  customer: customerId,
  billingType: 'BOLETO',
  value: 150.00,
  dueDate: '2024-12-31',
  description: 'Service payment',
});

const boletoLine = await asaas.payments.getIdentificationField(boletoPayment.id);

// Credit Card Payment
const cardPayment = await asaas.payments.create({
  customer: customerId,
  billingType: 'CREDIT_CARD',
  value: 200.00,
  dueDate: '2024-12-31',
  creditCard: {
    holderName: 'João da Silva',
    number: '4111111111111111',
    expiryMonth: '12',
    expiryYear: '2025',
    ccv: '123',
  },
  creditCardHolderInfo: {
    name: 'João da Silva',
    email: 'joao@example.com',
    cpfCnpj: '12345678901',
    postalCode: '01234567',
    addressNumber: '123',
  },
});
```

### Subscriptions

```typescript
// Create monthly subscription
const subscription = await asaas.subscriptions.create({
  customer: customerId,
  billingType: 'PIX',
  cycle: 'MONTHLY',
  value: 99.90,
  nextDueDate: '2024-12-01',
  description: 'Premium Plan',
});

// Get subscription payments
const payments = await asaas.subscriptions.getPayments(subscription.id);

// Update subscription
const updated = await asaas.subscriptions.update(subscription.id, {
  value: 149.90,
});
```

### Transfers

```typescript
// PIX Transfer
const transfer = await asaas.transfers.create({
  value: 100.00,
  operationType: 'PIX',
  pixAddressKey: '12345678901',
  pixAddressKeyType: 'CPF',
  description: 'Payment to supplier',
});

// Bank Transfer (TED)
const tedTransfer = await asaas.transfers.create({
  value: 500.00,
  operationType: 'TED',
  bankAccount: {
    bank: { code: '001' },
    accountName: 'João da Silva',
    ownerName: 'João da Silva',
    cpfCnpj: '12345678901',
    agency: '1234',
    account: '12345',
    accountDigit: '6',
    bankAccountType: 'CONTA_CORRENTE',
  },
  description: 'Supplier payment',
});
```

### Account Management

```typescript
// Get account info
const accountInfo = await asaas.account.getInfo();
console.log('Account:', accountInfo.name);

// Check balance
const balance = await asaas.account.getBalance();
console.log('Balance: R$', balance.balance.toFixed(2));

// Get transactions
const transactions = await asaas.account.getTransactions({
  startDate: '2024-01-01',
  finishDate: '2024-12-31',
  limit: 50,
});
```

## 🔒 Error Handling

The SDK provides detailed error information through the `AsaasApiError` class:

```typescript
import { AsaasApiError } from '@eziocm/asaas-sdk';

try {
  const payment = await asaas.payments.create({
    customer: 'invalid-id',
    billingType: 'PIX',
    value: 100.00,
    dueDate: '2024-12-31',
  });
} catch (error) {
  if (error instanceof AsaasApiError) {
    console.error('Status Code:', error.statusCode);
    console.error('Errors:', error.asaasError.errors);
    
    // Handle specific errors
    if (error.statusCode === 404) {
      console.error('Customer not found');
    } else if (error.statusCode === 400) {
      console.error('Invalid request data');
    }
  } else {
    console.error('Network or unexpected error:', error);
  }
}
```

## 🔐 Security Best Practices

### Environment Variables

Never hardcode your API keys. Use environment variables:

```typescript
// ✅ Good
const asaas = new AsaasSDK({
  apiKey: process.env.ASAAS_API_KEY!,
  environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox',
});

// ❌ Bad
const asaas = new AsaasSDK({
  apiKey: 'your-api-key-here', // Never do this!
  environment: 'production',
});
```

### Input Validation

Always validate user inputs before sending to the API:

```typescript
import { z } from 'zod';

const paymentSchema = z.object({
  value: z.number().positive().max(1000000),
  dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  description: z.string().max(500),
});

// Validate before creating payment
const validatedData = paymentSchema.parse(userInput);
const payment = await asaas.payments.create({
  customer: customerId,
  billingType: 'PIX',
  ...validatedData,
});
```

### Credit Card Security

Use tokenization for credit card data:

```typescript
// Tokenize card first
const token = await asaas.creditCard.tokenize({
  customer: customerId,
  creditCard: cardData,
  creditCardHolderInfo: holderInfo,
});

// Use token for payments
const payment = await asaas.payments.create({
  customer: customerId,
  billingType: 'CREDIT_CARD',
  value: 100.00,
  dueDate: '2024-12-31',
  creditCardToken: token.creditCardToken,
});
```

## 📖 TypeScript Support

The SDK is built with TypeScript and provides full type definitions:

```typescript
import type {
  Customer,
  Payment,
  Subscription,
  PaymentStatus,
  BillingType,
} from '@eziocm/asaas-sdk';

// Type-safe payment creation
const payment: Payment = await asaas.payments.create({
  customer: 'cus_123',
  billingType: 'PIX' as BillingType,
  value: 100.00,
  dueDate: '2024-12-31',
});

// Type inference
const status: PaymentStatus = payment.status; // 'PENDING' | 'CONFIRMED' | etc.
```

## 🧪 Testing

### Unit Testing

```typescript
import { describe, it, expect, vi } from 'vitest';
import { AsaasSDK } from '@eziocm/asaas-sdk';

describe('Payment Creation', () => {
  it('should create a PIX payment', async () => {
    const asaas = new AsaasSDK({
      apiKey: 'test-key',
      environment: 'sandbox',
    });

    const payment = await asaas.payments.create({
      customer: 'cus_test',
      billingType: 'PIX',
      value: 100.00,
      dueDate: '2024-12-31',
    });

    expect(payment.billingType).toBe('PIX');
    expect(payment.value).toBe(100.00);
  });
});
```

## 🌍 Environment Configuration

### Sandbox (Testing)

```typescript
const asaas = new AsaasSDK({
  apiKey: process.env.ASAAS_SANDBOX_API_KEY!,
  environment: 'sandbox',
});
```

### Production

```typescript
const asaas = new AsaasSDK({
  apiKey: process.env.ASAAS_PRODUCTION_API_KEY!,
  environment: 'production',
});
```

### Custom Base URL

```typescript
const asaas = new AsaasSDK({
  apiKey: process.env.ASAAS_API_KEY!,
  baseUrl: 'https://custom-api.asaas.com/v3',
});
```

## 📊 Performance Tips

### Parallel Requests

Use `Promise.all` for independent operations:

```typescript
// ✅ Good - Parallel execution
const [customer, balance, transactions] = await Promise.all([
  asaas.customers.get(customerId),
  asaas.account.getBalance(),
  asaas.account.getTransactions({ limit: 10 }),
]);

// ❌ Slow - Sequential execution
const customer = await asaas.customers.get(customerId);
const balance = await asaas.account.getBalance();
const transactions = await asaas.account.getTransactions({ limit: 10 });
```

### Pagination

Handle large datasets efficiently:

```typescript
async function getAllCustomers() {
  const allCustomers = [];
  let offset = 0;
  const limit = 100;
  
  while (true) {
    const response = await asaas.customers.list({ offset, limit });
    allCustomers.push(...response.data);
    
    if (!response.hasMore) break;
    offset += limit;
  }
  
  return allCustomers;
}
```

## 🔗 Links

- [Asaas Official Documentation](https://docs.asaas.com/reference)
- [GitHub Repository](https://github.com/eziocm/asaas-sdk)
- [NPM Package](https://www.npmjs.com/package/@eziocm/asaas-sdk)
- [Issue Tracker](https://github.com/eziocm/asaas-sdk/issues)

## 📄 License

MIT © [Ezio Caetano Morais](https://github.com/eziocm)

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for release history.

## ⚠️ Support

- **Issues**: [GitHub Issues](https://github.com/eziocm/asaas-sdk/issues)
- **Email**: <eziocm@gmail.com>

---

Made with ❤️ by [Ezio Caetano Morais](https://github.com/eziocm)
