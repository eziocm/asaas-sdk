/**
 * Subscription-related types
 */

import { BillingType, SubscriptionStatus, SubscriptionCycle } from './common';
import { Discount, Interest, Fine } from './payment';

export interface CreditCard {
    holderName: string;
    number: string;
    expiryMonth: string;
    expiryYear: string;
    ccv: string;
}

export interface CreditCardHolderInfo {
    name: string;
    email: string;
    cpfCnpj: string;
    postalCode: string;
    addressNumber: string;
    phone?: string;
}

export interface SubscriptionData {
    customer: string;
    billingType: BillingType;
    cycle: SubscriptionCycle;
    value: number;
    nextDueDate: string;
    description?: string;
    endDate?: string;
    maxPayments?: number;
    externalReference?: string;
    discount?: Discount;
    interest?: Interest;
    fine?: Fine;
}

export interface SubscriptionWithCardData extends SubscriptionData {
    billingType: 'CREDIT_CARD';
    creditCard?: CreditCard;
    creditCardHolderInfo?: CreditCardHolderInfo;
    creditCardToken?: string;
}

export interface Subscription extends SubscriptionData {
    object: 'subscription';
    id: string;
    dateCreated: string;
    paymentLink?: string;
    status: SubscriptionStatus;
    split?: any;
    deleted: boolean;
}

export interface SubscriptionListParams {
    customer?: string;
    billingType?: BillingType;
    status?: SubscriptionStatus;
    deletedOnly?: boolean;
    includeDeleted?: boolean;
    externalReference?: string;
    offset?: number;
    limit?: number;
}

export interface SubscriptionUpdateData {
    billingType?: BillingType;
    value?: number;
    nextDueDate?: string;
    discount?: Discount;
    interest?: Interest;
    fine?: Fine;
    cycle?: SubscriptionCycle;
    description?: string;
    endDate?: string;
    updatePendingPayments?: boolean;
}
