/**
 * Comprehensive example demonstrating all SDK features
 */

import { AsaasSDK } from '../src/index';

const asaas = new AsaasSDK({
    apiKey: process.env.ASAAS_API_KEY || '',
    environment: 'sandbox',
});

async function comprehensiveExample() {
    try {
        console.log('🚀 Starting comprehensive Asaas SDK test...\n');

        // 1. Customer Management
        console.log('1️⃣ Creating customer...');
        const customer = await asaas.customers.create({
            name: 'João da Silva',
            email: 'joao@example.com',
            cpfCnpj: '12345678901',
            mobilePhone: '11999999999',
        });
        console.log(`✅ Customer created: ${customer.id}\n`);

        // 2. Payment Creation
        console.log('2️⃣ Creating PIX payment...');
        const payment = await asaas.payments.create({
            customer: customer.id,
            billingType: 'PIX',
            value: 100.00,
            dueDate: '2024-12-31',
            description: 'Test payment',
        });
        console.log(`✅ Payment created: ${payment.id}\n`);

        // 3. Installment Creation
        console.log('3️⃣ Creating installment plan...');
        const installment = await asaas.installments.create({
            customer: customer.id,
            billingType: 'BOLETO',
            value: 300.00,
            dueDate: '2024-12-01',
            installmentCount: 3,
            installmentValue: 100.00,
            description: '3x installment plan',
        });
        console.log(`✅ Installment created: ${installment.id}\n`);

        // 4. Subscription Creation
        console.log('4️⃣ Creating subscription...');
        const subscription = await asaas.subscriptions.create({
            customer: customer.id,
            billingType: 'PIX',
            cycle: 'MONTHLY',
            value: 99.90,
            nextDueDate: '2024-12-01',
            description: 'Premium Plan',
        });
        console.log(`✅ Subscription created: ${subscription.id}\n`);

        // 5. Account Information
        console.log('5️⃣ Getting account info...');
        const accountInfo = await asaas.account.getInfo();
        console.log(`✅ Account: ${accountInfo.name}\n`);

        // 6. Financial Balance
        console.log('6️⃣ Checking balance...');
        const balance = await asaas.account.getBalance();
        console.log(`✅ Balance: R$ ${balance.balance.toFixed(2)}\n`);

        // 7. Transfer Creation
        console.log('7️⃣ Creating transfer...');
        const transfer = await asaas.transfers.create({
            value: 50.00,
            operationType: 'PIX',
            pixAddressKey: '12345678901',
            pixAddressKeyType: 'CPF',
            description: 'Test transfer',
        });
        console.log(`✅ Transfer created: ${transfer.id}\n`);

        // 8. Anticipation Simulation
        console.log('8️⃣ Simulating anticipation...');
        const simulation = await asaas.anticipations.simulate({
            payment: payment.id,
            anticipationDays: 15,
        });
        console.log(`✅ Anticipation: R$ ${simulation.netValue.toFixed(2)}\n`);

        // 9. Webhook Creation
        console.log('9️⃣ Creating webhook...');
        const webhook = await asaas.webhooks.create({
            name: 'Test Webhook',
            url: 'https://example.com/webhook',
            email: 'dev@example.com',
            enabled: true,
            events: ['PAYMENT_CREATED', 'PAYMENT_CONFIRMED'],
        });
        console.log(`✅ Webhook created: ${webhook.id}\n`);

        // 10. PIX Key Creation
        console.log('🔟 Creating PIX key...');
        const pixKey = await asaas.pix.createAddressKey({
            type: 'EVP',
        });
        console.log(`✅ PIX key created: ${pixKey.key}\n`);

        // 11. Credit Card Tokenization
        console.log('1️⃣1️⃣ Tokenizing credit card...');
        const cardToken = await asaas.creditCard.tokenize({
            customer: customer.id,
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
        console.log(`✅ Card tokenized: ${cardToken.creditCardToken}\n`);

        // 12. List Financial Transactions
        console.log('1️⃣2️⃣ Listing transactions...');
        const transactions = await asaas.account.getTransactions({
            startDate: '2024-01-01',
            finishDate: '2024-12-31',
            limit: 10,
        });
        console.log(`✅ Found ${transactions.totalCount} transactions\n`);

        // 13. Subaccount Creation
        console.log('1️⃣3️⃣ Creating subaccount...');
        const subaccount = await asaas.subaccounts.create({
            name: 'Partner Store',
            email: 'partner@example.com',
            cpfCnpj: '98765432100',
            mobilePhone: '11988888888',
        });
        console.log(`✅ Subaccount created: ${subaccount.id}\n`);

        console.log('🎉 All operations completed successfully!');
        console.log('\n📊 Summary:');
        console.log(`- Customer: ${customer.id}`);
        console.log(`- Payment: ${payment.id}`);
        console.log(`- Installment: ${installment.id}`);
        console.log(`- Subscription: ${subscription.id}`);
        console.log(`- Transfer: ${transfer.id}`);
        console.log(`- Webhook: ${webhook.id}`);
        console.log(`- PIX Key: ${pixKey.key}`);
        console.log(`- Subaccount: ${subaccount.id}`);

    } catch (error) {
        console.error('❌ Error:', error);
    }
}

// Run the example
if (require.main === module) {
    comprehensiveExample();
}

export { comprehensiveExample };
