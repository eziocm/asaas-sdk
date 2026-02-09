/**
 * Split Payment-related types
 */

import { Split } from './payment';

export interface SplitConfig {
    walletId: string;
    fixedValue?: number;
    percentualValue?: number;
    totalFixedValue?: number;
}

export interface SplitPaymentInfo {
    paymentId: string;
    splits: Split[];
}

export interface SplitUpdateData {
    splits: Split[];
}
