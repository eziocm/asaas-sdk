# @eziocm/asaas-sdk

TypeScript SDK for Asaas Payment Gateway API v3

## 📦 Installation

```bash
npm install @eziocm/asaas-sdk
```

## 🚀 Quick Start

```typescript
import { AsaasSDK } from '@watranscript/asaas-sdk';

// Initialize the SDK
const asaas = new AsaasSDK({
  apiKey: 'your-api-key',
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
  description: 'Pagamento de teste',
});

// Get PIX QR Code
const qrCode = await asaas.payments.getPixQrCode(payment.id);
console.log('PIX Payload:', qrCode.payload);
```

## 📚 Features

- ✅ **Full TypeScript support** with comprehensive type definitions
- ✅ **Modular architecture** - use only what you need
- ✅ **Promise-based API** with async/await
- ✅ **Automatic error handling** with detailed error messages
- ✅ **Environment support** - sandbox and production
- ✅ **Comprehensive coverage** of Asaas API v3

## 🔧 API Clients

### Customers

```typescript
// Create customer
const customer = await asaas.customers.create({
  name: 'João da Silva',
  email: 'joao@example.com',
  cpfCnpj: '12345678901',
});

// List customers
const customers = await asaas.customers.list({
  limit: 10,
  offset: 0,
});

// Get customer
const customer = await asaas.customers.get('cus_123456');

// Update customer
const updated = await asaas.customers.update('cus_123456', {
  name: 'João Silva',
});

// Delete customer
await asaas.customers.delete('cus_123456');
```

### Payments

```typescript
// Create payment
const payment = await asaas.payments.create({
  customer: 'cus_123456',
  billingType: 'PIX',
  value: 100.00,
  dueDate: '2024-12-31',
  description: 'Monthly subscription',
});

// List payments
const payments = await asaas.payments.list({
  customer: 'cus_123456',
  status: 'PENDING',
});

// Get payment
const payment = await asaas.payments.get('pay_123456');

// Get PIX QR Code
const qrCode = await asaas.payments.getPixQrCode('pay_123456');

// Get payment status
const status = await asaas.payments.getStatus('pay_123456');

// Update payment
const updated = await asaas.payments.update('pay_123456', {
  value: 150.00,
});

// Delete payment
await asaas.payments.delete('pay_123456');
```

### Subscriptions

```typescript
// Create subscription with PIX
const subscription = await asaas.subscriptions.create({
  customer: 'cus_123456',
  billingType: 'PIX',
  cycle: 'MONTHLY',
  value: 99.90,
  nextDueDate: '2024-12-01',
  description: 'Premium Plan',
});

// Create subscription with credit card
const subscription = await asaas.subscriptions.createWithCard({
  customer: 'cus_123456',
  billingType: 'CREDIT_CARD',
  cycle: 'MONTHLY',
  value: 99.90,
  nextDueDate: '2024-12-01',
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

// List subscriptions
const subscriptions = await asaas.subscriptions.list({
  customer: 'cus_123456',
  status: 'ACTIVE',
});

// Get subscription payments
const payments = await asaas.subscriptions.getPayments('sub_123456');

// Update subscription
const updated = await asaas.subscriptions.update('sub_123456', {
  value: 149.90,
});

// Delete subscription
await asaas.subscriptions.delete('sub_123456');
```

### PIX

```typescript
// Create PIX address key
const key = await asaas.pix.createAddressKey({
  type: 'EVP',
});

// List PIX keys
const keys = await asaas.pix.listAddressKeys();

// Pay a PIX QR Code
const transaction = await asaas.pix.createTransaction({
  qrCode: {
    payload: '00020126580014br.gov.bcb.pix...',
  },
  value: 100.00,
  description: 'Payment description',
});

// Decode PIX QR Code
const decoded = await asaas.pix.decodeQrCode('00020126580014br.gov.bcb.pix...');

// List PIX transactions
const transactions = await asaas.pix.listTransactions({
  type: 'CREDIT',
  status: 'DONE',
});

// Create PIX automatic debit authorization
const authorization = await asaas.pix.createAuthorization({
  customer: 'cus_123456',
  value: 100.00,
  description: 'Monthly subscription',
});

// List authorizations
const authorizations = await asaas.pix.listAuthorizations({
  customer: 'cus_123456',
  status: 'ACTIVE',
});
```

### Webhooks

```typescript
// Create webhook
const webhook = await asaas.webhooks.create({
  name: 'Main Webhook',
  url: 'https://mysite.com/webhook/asaas',
  email: 'dev@mysite.com',
  enabled: true,
  events: [
    'PAYMENT_CREATED',
    'PAYMENT_CONFIRMED',
    'PAYMENT_RECEIVED',
    'PAYMENT_OVERDUE',
  ],
});

// List webhooks
const webhooks = await asaas.webhooks.list();

// Update webhook
const updated = await asaas.webhooks.update('webhook_123456', {
  enabled: false,
});

// Delete webhook
await asaas.webhooks.delete('webhook_123456');

// Remove backoff penalty
await asaas.webhooks.removeBackoff('webhook_123456');
```

## 🔐 Configuration

```typescript
const asaas = new AsaasSDK({
  apiKey: 'your-api-key',
  environment: 'production', // 'production' or 'sandbox'
  // Or use custom baseUrl
  baseUrl: 'https://api.asaas.com/v3',
});
```

## 🛠️ Error Handling

```typescript
import { AsaasApiError } from '@watranscript/asaas-sdk';

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
  }
}
```

## 📖 Type Definitions

All types are fully documented and exported:

```typescript
import type {
  Customer,
  Payment,
  Subscription,
  PixTransaction,
  Webhook,
  BillingType,
  PaymentStatus,
  SubscriptionStatus,
} from '@watranscript/asaas-sdk';
```

## 🔗 Links

- [Asaas Official Documentation](https://docs.asaas.com/reference)
- [API Endpoints Map](../docs/asaas-api-endpoints-map.md)

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
