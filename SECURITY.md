# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 2.x.x   | :white_check_mark: |
| < 2.0   | :x:                |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to: **<eziocm@gmail.com>**

Include the following information:

- Type of vulnerability
- Full paths of source file(s) related to the vulnerability
- Location of the affected source code (tag/branch/commit or direct URL)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the vulnerability

### What to Expect

- **Response Time**: Within 48 hours
- **Updates**: Every 5 business days
- **Fix Timeline**: Critical issues within 7 days, others within 30 days
- **Credit**: Security researchers will be credited (unless anonymity is requested)

## Security Best Practices

### API Key Protection

```typescript
// ✅ GOOD - Use environment variables
const asaas = new AsaasSDK({
  apiKey: process.env.ASAAS_API_KEY!,
  environment: 'production',
});

// ❌ BAD - Never hardcode API keys
const asaas = new AsaasSDK({
  apiKey: 'aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDAwODI3NTk6OiRhYWNoX2Y5ZGU0YzE2LTZkYjAtNGI3Yy05YjIyLWM4NTk4YjI0NTU5Mw==',
});
```

### Input Validation

Always validate user inputs before sending to the API:

```typescript
import { z } from 'zod';

// Define schema
const paymentSchema = z.object({
  value: z.number().positive().max(1000000),
  dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  cpfCnpj: z.string().regex(/^\d{11}$|^\d{14}$/),
});

// Validate before use
try {
  const validData = paymentSchema.parse(userInput);
  await asaas.payments.create(validData);
} catch (error) {
  // Handle validation error
}
```

### Credit Card Data

**Never store credit card data**. Use tokenization:

```typescript
// Tokenize card immediately
const token = await asaas.creditCard.tokenize({
  customer: customerId,
  creditCard: {
    holderName: cardData.holderName,
    number: cardData.number,
    expiryMonth: cardData.expiryMonth,
    expiryYear: cardData.expiryYear,
    ccv: cardData.ccv,
  },
  creditCardHolderInfo: holderInfo,
});

// Use token for payments
const payment = await asaas.payments.create({
  customer: customerId,
  billingType: 'CREDIT_CARD',
  value: 100.00,
  dueDate: '2024-12-31',
  creditCardToken: token.creditCardToken, // Use token, not raw data
});

// Discard original card data
cardData = null;
```

### HTTPS Only

Always use HTTPS in production:

```typescript
// The SDK uses HTTPS by default
// Production: https://api.asaas.com/v3
// Sandbox: https://sandbox.asaas.com/api/v3
```

### Rate Limiting

Implement rate limiting to prevent abuse:

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### Error Handling

Don't expose sensitive information in error messages:

```typescript
try {
  const payment = await asaas.payments.create(data);
} catch (error) {
  if (error instanceof AsaasApiError) {
    // ✅ GOOD - Log full error server-side
    console.error('Payment error:', error);
    
    // ✅ GOOD - Return generic message to client
    res.status(500).json({
      error: 'Payment processing failed',
      code: 'PAYMENT_ERROR',
    });
  }
  
  // ❌ BAD - Don't expose internal errors
  // res.status(500).json({ error: error.message });
}
```

### Webhook Validation

Validate webhook signatures (when available):

```typescript
import crypto from 'crypto';

function validateWebhook(payload: string, signature: string, secret: string): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
    
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

app.post('/webhook', (req, res) => {
  const signature = req.headers['x-asaas-signature'];
  const isValid = validateWebhook(
    JSON.stringify(req.body),
    signature,
    process.env.WEBHOOK_SECRET!
  );
  
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
  
  // Process webhook
});
```

### Dependency Security

Keep dependencies updated:

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Update dependencies
npm update
```

### Environment Separation

Use different API keys for different environments:

```typescript
const config = {
  development: {
    apiKey: process.env.ASAAS_DEV_API_KEY!,
    environment: 'sandbox' as const,
  },
  production: {
    apiKey: process.env.ASAAS_PROD_API_KEY!,
    environment: 'production' as const,
  },
};

const asaas = new AsaasSDK(config[process.env.NODE_ENV || 'development']);
```

## Known Security Considerations

### API Key Exposure

- Never commit API keys to version control
- Use `.env` files and add to `.gitignore`
- Rotate keys periodically
- Use different keys for different environments

### Data Privacy

- Follow LGPD (Brazilian General Data Protection Law)
- Encrypt sensitive data at rest
- Use HTTPS for all communications
- Implement proper access controls

### Logging

```typescript
// ✅ GOOD - Log without sensitive data
console.log('Payment created:', {
  paymentId: payment.id,
  value: payment.value,
  status: payment.status,
});

// ❌ BAD - Don't log sensitive data
console.log('Payment created:', {
  creditCard: cardData, // Never log card data
  apiKey: config.apiKey, // Never log API keys
});
```

## Security Checklist

- [ ] API keys stored in environment variables
- [ ] Input validation implemented
- [ ] Credit card tokenization used
- [ ] HTTPS enforced in production
- [ ] Rate limiting implemented
- [ ] Error messages sanitized
- [ ] Dependencies regularly updated
- [ ] Webhook signatures validated
- [ ] Logging excludes sensitive data
- [ ] Environment separation configured

## Contact

For security concerns, contact: **<eziocm@gmail.com>**

---

Last updated: 2026-02-08
