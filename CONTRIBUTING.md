# Contributing to @eziocm/asaas-sdk

Thank you for your interest in contributing to the Asaas SDK! This document provides guidelines and instructions for contributing.

## 🤝 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

## 🐛 Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title** - Descriptive and specific
- **Steps to reproduce** - Detailed steps to reproduce the behavior
- **Expected behavior** - What you expected to happen
- **Actual behavior** - What actually happened
- **Environment** - Node.js version, OS, SDK version
- **Code sample** - Minimal code to reproduce the issue

### Bug Report Template

```markdown
**Description**
A clear description of the bug.

**To Reproduce**
Steps to reproduce:
1. Initialize SDK with...
2. Call method...
3. See error

**Expected Behavior**
What should happen.

**Actual Behavior**
What actually happens.

**Environment**
- Node.js version: 
- SDK version: 
- OS: 

**Code Sample**
\`\`\`typescript
// Your code here
\`\`\`
```

## 💡 Suggesting Enhancements

Enhancement suggestions are welcome! Please include:

- **Use case** - Why is this enhancement needed?
- **Proposed solution** - How should it work?
- **Alternatives** - Other solutions you've considered
- **Additional context** - Screenshots, examples, etc.

## 🔧 Development Setup

### Prerequisites

- Node.js 20+
- npm or pnpm
- Git

### Setup Steps

```bash
# Clone the repository
git clone https://github.com/eziocm/asaas-sdk.git
cd asaas-sdk

# Install dependencies
npm install

# Build the project
npm run build

# Run in development mode
npm run dev
```

## 📝 Coding Standards

### TypeScript

- Use TypeScript strict mode
- Provide complete type definitions
- Avoid `any` type - use `unknown` if needed
- Use interfaces for object shapes
- Use type aliases for unions/intersections

### Code Style

```typescript
// ✅ Good
export interface PaymentData {
  customer: string;
  billingType: BillingType;
  value: number;
  dueDate: string;
}

export class PaymentClient {
  constructor(private http: AsaasHttpClient) {}

  async create(data: PaymentData): Promise<Payment> {
    return this.http.post<Payment>('/payments', data);
  }
}

// ❌ Bad
export class PaymentClient {
  constructor(private http: any) {} // Don't use 'any'

  async create(data: any): Promise<any> { // Missing types
    return this.http.post('/payments', data);
  }
}
```

### Naming Conventions

- **Classes**: PascalCase (`PaymentClient`)
- **Interfaces**: PascalCase (`PaymentData`)
- **Methods**: camelCase (`createPayment`)
- **Constants**: UPPER_SNAKE_CASE (`API_VERSION`)
- **Files**: kebab-case (`payment.client.ts`)

### Documentation

- Add JSDoc comments for all public APIs
- Include `@param` and `@returns` tags
- Provide usage examples for complex methods

```typescript
/**
 * Create a new payment
 * 
 * @param data - Payment creation data
 * @returns Promise resolving to the created payment
 * 
 * @example
 * ```typescript
 * const payment = await client.create({
 *   customer: 'cus_123',
 *   billingType: 'PIX',
 *   value: 100.00,
 *   dueDate: '2024-12-31',
 * });
 * ```
 */
async create(data: PaymentData): Promise<Payment> {
  return this.http.post<Payment>('/payments', data);
}
```

## 🧪 Testing

### Writing Tests

- Write tests for all new features
- Maintain or improve code coverage
- Test edge cases and error scenarios
- Use descriptive test names

```typescript
import { describe, it, expect } from 'vitest';

describe('PaymentClient', () => {
  describe('create', () => {
    it('should create a PIX payment successfully', async () => {
      // Arrange
      const client = new PaymentClient(mockHttp);
      const data = {
        customer: 'cus_123',
        billingType: 'PIX',
        value: 100.00,
        dueDate: '2024-12-31',
      };

      // Act
      const payment = await client.create(data);

      // Assert
      expect(payment.billingType).toBe('PIX');
      expect(payment.value).toBe(100.00);
    });

    it('should throw error for invalid customer', async () => {
      // Test error scenario
    });
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## 📦 Pull Request Process

### Before Submitting

- [ ] Code follows the style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] All tests pass
- [ ] No linting errors

### PR Guidelines

1. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow coding standards
   - Add tests
   - Update documentation

3. **Commit your changes**

   ```bash
   git commit -m "feat: add new payment method"
   ```

   Use conventional commits:
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `refactor:` - Code refactoring
   - `test:` - Test changes
   - `chore:` - Build/tooling changes

4. **Push to your fork**

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request**
   - Provide clear description
   - Reference related issues
   - Add screenshots if applicable

### PR Template

```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How has this been tested?

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
```

## 🏗️ Project Structure

```
asaas-sdk/
├── src/
│   ├── clients/          # API client modules
│   │   ├── customer.client.ts
│   │   ├── payment.client.ts
│   │   └── ...
│   ├── types/            # TypeScript type definitions
│   │   ├── common.ts
│   │   ├── customer.ts
│   │   └── ...
│   ├── utils/            # Utility functions
│   │   └── http-client.ts
│   └── index.ts          # Main entry point
├── examples/             # Usage examples
├── dist/                 # Compiled output
├── package.json
├── tsconfig.json
└── README.md
```

## 🔄 Release Process

Releases are managed by maintainers:

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create git tag
4. Push to GitHub
5. Publish to npm

## 📞 Getting Help

- **Questions**: Open a GitHub Discussion
- **Bugs**: Create an Issue
- **Security**: Email <eziocm@gmail.com>

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🎉
