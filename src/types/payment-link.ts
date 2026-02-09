/**
 * Payment Link-related types
 */

import { BillingType, SubscriptionCycle, PaymentLinkChargeType } from './common';
import { Split, Callback } from './payment';

export interface PaymentLinkData {
    name: string;
    description?: string;
    value: number;
    billingType: BillingType;
    chargeType: PaymentLinkChargeType;
    dueDateLimitDays?: number;
    maxInstallmentCount?: number;
    subscriptionCycle?: SubscriptionCycle;
    notificationEnabled?: boolean;
    endDate?: string;
    split?: Split[];
    callback?: Callback;
}

export interface PaymentLink extends PaymentLinkData {
    object: 'paymentLink';
    id: string;
    dateCreated: string;
    deleted: boolean;
    active: boolean;
    url: string;
    viewCount: number;
    paymentCount: number;
}

export interface PaymentLinkListParams {
    name?: string;
    active?: boolean;
    includeDeleted?: boolean;
    offset?: number;
    limit?: number;
}

export interface PaymentLinkUpdateData {
    name?: string;
    description?: string;
    value?: number;
    billingType?: BillingType;
    chargeType?: PaymentLinkChargeType;
    dueDateLimitDays?: number;
    maxInstallmentCount?: number;
    subscriptionCycle?: SubscriptionCycle;
    notificationEnabled?: boolean;
    endDate?: string;
}

export interface PaymentLinkImage {
    object: 'paymentLinkImage';
    id: string;
    originalName: string;
    main: boolean;
}
