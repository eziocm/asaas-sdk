/**
 * Checkout Client - Provides checkout URL generation via payment creation
 */

import { AsaasHttpClient } from '../utils/http-client';
import {
    Payment,
    CheckoutConfig,
    CheckoutResult,
} from '../types';

export class CheckoutClient {
    private static readonly CHECKOUT_BASE_URL = 'https://www.asaas.com/c';

    constructor(private http: AsaasHttpClient) { }

    /**
     * Create a payment and generate a checkout URL
     */
    async createCheckout(config: CheckoutConfig): Promise<CheckoutResult> {
        const payment = await this.http.post<Payment>('/payments', {
            customer: config.customer,
            billingType: config.billingType,
            value: config.value,
            dueDate: config.dueDate,
            description: config.description,
            externalReference: config.externalReference,
            callback: config.callback,
        });

        return {
            paymentId: payment.id,
            checkoutUrl: payment.invoiceUrl ?? `${CheckoutClient.CHECKOUT_BASE_URL}/${payment.id}`,
        };
    }

    /**
     * Get the checkout URL for an existing payment
     */
    async getCheckoutUrl(paymentId: string): Promise<CheckoutResult> {
        const payment = await this.http.get<Payment>(`/payments/${paymentId}`);

        return {
            paymentId: payment.id,
            checkoutUrl: payment.invoiceUrl ?? `${CheckoutClient.CHECKOUT_BASE_URL}/${payment.id}`,
        };
    }
}
