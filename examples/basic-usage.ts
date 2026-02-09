/**
 * Example usage of Asaas SDK
 * 
 * This file demonstrates how to use the SDK in a real application
 */

import { AsaasSDK } from '@watranscript/asaas-sdk';

// Initialize SDK
const asaas = new AsaasSDK({
    apiKey: process.env.ASAAS_API_KEY || '',
    environment: 'sandbox',
});

async function main() {
    try {
        // 1. Create a customer
        console.log('Creating customer...');
        const customer = await asaas.customers.create({
            name: 'João da Silva',
            email: 'joao@example.com',
            cpfCnpj: '12345678901',
            mobilePhone: '11999999999',
            observations: JSON.stringify({ app: 'watranscript' }),
        });
        console.log('Customer created:', customer.id);

        // 2. Create a PIX payment
        console.log('\nCreating PIX payment...');
        const payment = await asaas.payments.create({
            customer: customer.id,
            billingType: 'PIX',
            value: 100.00,
            dueDate: '2024-12-31',
            description: 'Test payment',
        });
        console.log('Payment created:', payment.id);

        // 3. Get PIX QR Code
        console.log('\nGetting PIX QR Code...');
        const qrCode = await asaas.payments.getPixQrCode(payment.id);
        console.log('QR Code payload:', qrCode.payload.substring(0, 50) + '...');

        // 4. Create a subscription
        console.log('\nCreating subscription...');
        const subscription = await asaas.subscriptions.create({
            customer: customer.id,
            billingType: 'PIX',
            cycle: 'MONTHLY',
            value: 99.90,
            nextDueDate: '2024-12-01',
            description: 'Premium Plan',
        });
        console.log('Subscription created:', subscription.id);

        // 5. List customer payments
        console.log('\nListing customer payments...');
        const payments = await asaas.payments.list({
            customer: customer.id,
            limit: 10,
        });
        console.log(`Found ${payments.totalCount} payments`);

        // 6. Create webhook
        console.log('\nCreating webhook...');
        const webhook = await asaas.webhooks.create({
            name: 'Test Webhook',
            url: 'https://example.com/webhook',
            email: 'dev@example.com',
            enabled: true,
            events: [
                'PAYMENT_CREATED',
                'PAYMENT_CONFIRMED',
                'PAYMENT_RECEIVED',
            ],
        });
        console.log('Webhook created:', webhook.id);

        // 7. Create PIX address key
        console.log('\nCreating PIX address key...');
        const pixKey = await asaas.pix.createAddressKey({
            type: 'EVP',
        });
        console.log('PIX key created:', pixKey.key);

        console.log('\n✅ All operations completed successfully!');
    } catch (error) {
        console.error('Error:', error);
    }
}

// Run the example
if (require.main === module) {
    main();
}

export { main };
