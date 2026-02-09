/**
 * Payment-related types
 */

import { BillingType, PaymentStatus, DateRangeFilter } from './common';

export interface Discount {
    value: number;
    dueDateLimitDays?: number;
    type?: 'FIXED' | 'PERCENTAGE';
}

export interface Interest {
    value: number;
}

export interface Fine {
    value: number;
    type?: 'FIXED' | 'PERCENTAGE';
}

export interface Split {
    walletId: string;
    fixedValue?: number;
    percentualValue?: number;
}

export interface Callback {
    successUrl: string;
    autoRedirect?: boolean;
}

export interface PaymentData {
    customer: string;
    billingType: BillingType;
    value: number;
    dueDate: string;
    description?: string;
    externalReference?: string;
    installmentCount?: number;
    installmentValue?: number;
    discount?: Discount;
    interest?: Interest;
    fine?: Fine;
    postalService?: boolean;
    split?: Split[];
    callback?: Callback;
}

export interface Payment extends PaymentData {
    object: 'payment';
    id: string;
    dateCreated: string;
    subscription?: string;
    installment?: string;
    netValue?: number;
    status: PaymentStatus;
    confirmedDate?: string;
    paymentDate?: string;
    clientPaymentDate?: string;
    installmentNumber?: number;
    invoiceUrl?: string;
    bankSlipUrl?: string;
    transactionReceiptUrl?: string;
    invoiceNumber?: string;
    deleted: boolean;
    anticipated: boolean;
    anticipable: boolean;
    refunds?: any;
}

export interface PaymentListParams {
    customer?: string;
    billingType?: BillingType;
    status?: PaymentStatus;
    subscription?: string;
    installment?: string;
    externalReference?: string;
    paymentDate?: DateRangeFilter;
    estimatedCreditDate?: DateRangeFilter;
    dueDate?: DateRangeFilter;
    offset?: number;
    limit?: number;
}

export interface PaymentUpdateData {
    value?: number;
    dueDate?: string;
    description?: string;
    externalReference?: string;
    discount?: Discount;
    interest?: Interest;
    fine?: Fine;
}

export interface PixQrCode {
    encodedImage: string;
    payload: string;
    expirationDate: string;
}

export interface PaymentStatusResponse {
    status: PaymentStatus;
}

export interface DeletedResponse {
    deleted: boolean;
    id: string;
}
