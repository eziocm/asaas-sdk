# API Reference

This document provides a reference for the `@eziocm/asaas-sdk`.

## Initialization

```typescript
import { AsaasSDK } from '@eziocm/asaas-sdk';

const asaas = new AsaasSDK({
  apiKey: 'YOUR_API_KEY',
  environment: 'production', // 'sandbox' | 'production'
  // Optional: Custom Base URL
  // baseUrl: 'https://custom-proxy.com' 
});
```

### Configuration Options (`AsaasConfig`)

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `apiKey` | `string` | **Required** | Your Asaas API Key (starts with `$aact_...`) |
| `environment` | `'sandbox' \| 'production'` | `'production'` | The environment to connect to. |
| `baseUrl` | `string` | `undefined` | Overrides the default API URL. |

---

## Modules

The SDK is organized into modules accessible via the main `asaas` instance.

### `asaas.customers` (`CustomerClient`)

Manages customer records.

#### `CustomerClient.create(data)`

Creates a new customer.

- **data**: `CustomerData` object (name, cpfCnpj, email, etc.)

#### `CustomerClient.list(params?)`

Lists customers with optional filters.

- **params**: `name`, `email`, `cpfCnpj`, `offset`, `limit`

#### `CustomerClient.get(id)`

Retrieves a customer by ID.

#### `CustomerClient.update(id, data)`

Updates a customer's information.

#### `CustomerClient.delete(id)`

Deletes a customer.

#### `CustomerClient.restore(id)`

Restores a deleted customer.

---

### `asaas.payments` (`PaymentClient`)

Manages payments (Boletos, PIX, Credit Card).

#### `PaymentClient.create(data)`

Creates a new payment.

- **data**: `PaymentData` object.
  - `billingType`: `'BOLETO' | 'CREDIT_CARD' | 'PIX'`
  - `value`: Number
  - `dueDate`: String (YYYY-MM-DD)
  - `customer`: Customer ID

#### `PaymentClient.list(params?)`

Lists payments with filters.

- **params**: `customer`, `billingType`, `status`, `paymentDate`, `dueDate`, etc.

#### `PaymentClient.get(id)`

Retrieves a payment by ID.

#### `PaymentClient.update(id, data)`

Updates payment details (e.g., value, due date).

#### `PaymentClient.delete(id)`

Removes a payment.

#### `PaymentClient.restore(id)`

Restores a removed payment.

#### `PaymentClient.getPixQrCode(id)`

Returns the PIX QR Code payload and image (encoded) for a payment.

#### `PaymentClient.getIdentificationField(id)`

Returns the "Linha Digitável" for a Boleto.

#### `PaymentClient.receiveInCash(id, data?)`

Marks a payment as received in cash.

#### `PaymentClient.undoReceivedInCash(id)`

Undoes a cash reception.

---

### Other Modules

The following modules follow a similar CRUD pattern (`create`, `list`, `get`, `update`, `delete`) where applicable.

| Module | Access Property | Description |
| :--- | :--- | :--- |
| **Subscriptions** | `asaas.subscriptions` | Recurring billing plans |
| **Pix** | `asaas.pix` | PIX keys and transactions |
| **Installments** | `asaas.installments` | Payment Installments |
| **Transfers** | `asaas.transfers` | Transfers to other accounts (PIX/TED) |
| **Refunds** | `asaas.refunds` | Refund payments |
| **Anticipations** | `asaas.anticipations` | Receivables anticipation |
| **Account** | `asaas.account` | Account info and sub-accounts |
| **Subaccounts** | `asaas.subaccounts` | White-label sub-accounts |
| **Credit Card** | `asaas.creditCard` | Tokenization only (`asaas.creditCard.tokenize`) |
| **Webhooks** | `asaas.webhooks` | Configure webhooks |
| **Notifications** | `asaas.notifications` | Notification settings |
| **Payment Links** | `asaas.paymentLinks` | Payment Links |
| **Invoices** | `asaas.invoices` | Fiscal Invoices (Notas Fiscais) |

---

## Types

All types are exported from the root package.

```typescript
import { 
  Customer, 
  Payment, 
  PaymentStatus, 
  BillingType, 
  AsaasConfigFile 
} from '@eziocm/asaas-sdk';
```

See `src/types/index.ts` and individual type files for full definitions.
