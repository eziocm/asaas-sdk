/**
 * Checkout-related types
 */

import { BillingType } from './common';
import { Callback } from './payment';

export interface CheckoutConfig {
    customer: string;
    billingType: BillingType;
    value: number;
    dueDate: string;
    description?: string;
    externalReference?: string;
    callback: Callback;
}

export interface CheckoutResult {
    paymentId: string;
    checkoutUrl: string;
}
