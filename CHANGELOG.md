# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.0] - 2026-02-09

### Added

#### New Modules (3)

- **Chargebacks** - List and contest chargebacks
- **Credit Bureau** - Consult credit reports (Serasa)
- **Negative List** - Customer negative list management (Dunning)

### Fixed

- Improved type safety across all modules
- Fixed minor documentation issues

## [2.1.1] - 2026-02-08

### Fixed

- Fixed npm publication conflict with existing version 2.1.0
- Ensured all latest documentation and module updates are correctly published

## [2.1.0] - 2026-02-08

### Added

#### New Modules (4)

- **Payment Links** - Create and manage payment links
- **Checkout** - Customize and manage checkout experiences
- **Invoices** - Full invoice management support
- **Splits** - Complex payment splitting capabilities

### Fixed

- Added missing LICENSE file
- Improved package.json configuration
- Included complete documentation in npm package
- Enhanced type definitions for checkout, invoice, split, and payment-link modules

## [2.0.0] - 2026-02-08

### Added

#### New API Modules (8)

- **Installments** - Payment plan management with 8 methods
- **Transfers** - Bank and PIX transfers with 4 methods
- **Refunds** - Payment reversal operations with 3 methods
- **Anticipations** - Cash flow management with 8 methods
- **Account** - Account information and balance with 4 methods
- **Subaccounts** - Multi-tenant support with 6 methods
- **CreditCard** - Card tokenization for security
- **Notifications** - Notification settings management

#### Features

- Complete TypeScript type definitions for all new modules
- Comprehensive error handling with `AsaasApiError`
- Support for PIX, TED, and internal transfers
- Payment anticipation simulation
- Financial transaction history
- Subaccount document management
- Credit card tokenization for PCI compliance

#### Documentation

- Comprehensive README with usage examples
- Security best practices guide (SECURITY.md)
- Contributing guidelines (CONTRIBUTING.md)
- Complete API reference for all 13 modules
- Performance optimization tips
- Error handling examples

### Changed

- Package name from `@watranscript/asaas-sdk` to `@eziocm/asaas-sdk`
- Author information updated to Ezio Caetano Morais
- Improved type safety across all modules
- Enhanced JSDoc comments for better IDE support

### Technical Details

- 36 new methods across 8 modules
- ~1,800 lines of new code
- 6 new type definition files
- 8 new client implementation files
- Zero dependencies (lightweight)
- Full ESM and CommonJS support

## [1.0.0] - 2026-02-08

### Added

#### Initial Release - Core Modules (5)

- **Customers** - Full CRUD operations for customer management
- **Payments** - Payment processing (PIX, Boleto, Credit Card)
- **Subscriptions** - Recurring payment management
- **PIX** - PIX operations (keys, transactions, QR codes)
- **Webhooks** - Event notification management

#### Features

- TypeScript-first design with complete type definitions
- Promise-based async/await API
- Environment support (sandbox/production)
- Automatic error handling
- HTTP client with retry logic
- Comprehensive type safety

#### Documentation

- Basic README with installation and usage
- Type definitions for all core modules
- Example usage for common operations

### Technical Details

- Zero runtime dependencies
- Full TypeScript support
- ESM and CommonJS compatible
- Tree-shakeable exports

---

## Version History

- **2.2.0** - Added Chargebacks, Credit Bureau, Negative List
- **2.1.0** - Added Payment Links, Checkout, Invoice, Split
- **2.0.0** - Major feature release with 8 new modules
- **1.0.0** - Initial release with core functionality

## Upgrade Guide

### From 2.1.x to 2.2.x

#### New Features Available

You can now use these new modules:

```typescript
// Chargeback Management
await asaas.chargebacks.list({...});

// Credit Bureau (Serasa)
await asaas.creditBureau.create({...});

// Negative List (Dunning)
await asaas.negativeList.create({...});
```

---

## Future Roadmap

### Planned for 3.0.0

- Webhook signature validation
- Built-in retry logic
- Request caching
- Rate limiting helpers

---

## Links

- [GitHub Repository](https://github.com/eziocm/asaas-sdk)
- [NPM Package](https://www.npmjs.com/package/@eziocm/asaas-sdk)
- [Issue Tracker](https://github.com/eziocm/asaas-sdk/issues)
- [Asaas API Documentation](https://docs.asaas.com/reference)
