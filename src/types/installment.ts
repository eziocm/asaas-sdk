/**
 * Installment-related types
 */

import { BillingType } from './common';
import { Discount, Interest, Fine, Split } from './payment';

export interface InstallmentData {
    customer: string;
    billingType: BillingType;
    value: number;
    dueDate: string;
    installmentCount: number;
    installmentValue?: number;
    description?: string;
    externalReference?: string;
    discount?: Discount;
    interest?: Interest;
    fine?: Fine;
    split?: Split[];
    postalService?: boolean;
}

export interface Installment {
    object: 'installment';
    id: string;
    dateCreated: string;
    customer: string;
    billingType: BillingType;
    value: number;
    description?: string;
    externalReference?: string;
    installmentCount: number;
    deleted: boolean;
}

export interface InstallmentListParams {
    customer?: string;
    billingType?: BillingType;
    externalReference?: string;
    offset?: number;
    limit?: number;
}
