/**
 * Common types used across the Asaas SDK
 */

export type BillingType = 'BOLETO' | 'CREDIT_CARD' | 'PIX' | 'UNDEFINED';

export type PaymentStatus =
    | 'PENDING'
    | 'RECEIVED'
    | 'CONFIRMED'
    | 'OVERDUE'
    | 'REFUNDED'
    | 'RECEIVED_IN_CASH'
    | 'REFUND_REQUESTED'
    | 'CHARGEBACK_REQUESTED'
    | 'CHARGEBACK_DISPUTE'
    | 'AWAITING_CHARGEBACK_REVERSAL'
    | 'DUNNING_REQUESTED'
    | 'DUNNING_RECEIVED'
    | 'AWAITING_RISK_ANALYSIS';

export type SubscriptionStatus = 'ACTIVE' | 'INACTIVE' | 'EXPIRED';

export type SubscriptionCycle =
    | 'MONTHLY'
    | 'WEEKLY'
    | 'BIWEEKLY'
    | 'QUARTERLY'
    | 'SEMIANNUALLY'
    | 'YEARLY';

export type PixKeyType = 'EVP' | 'EMAIL' | 'PHONE' | 'CPF' | 'CNPJ';

export type PixTransactionType = 'DEBIT' | 'CREDIT';

export type PixTransactionStatus = 'PENDING' | 'DONE' | 'CANCELLED' | 'FAILED';

export type PixAuthorizationStatus = 'PENDING' | 'ACTIVE' | 'CANCELLED' | 'EXPIRED';

export type PixInstructionStatus = 'PENDING' | 'RECEIVED' | 'CONFIRMED' | 'CANCELLED';

export interface PaginatedResponse<T> {
    object: 'list';
    hasMore: boolean;
    totalCount: number;
    limit: number;
    offset: number;
    data: T[];
}

export interface PaginationParams {
    offset?: number;
    limit?: number;
}

export interface DateRangeFilter {
    'ge'?: string; // Greater than or equal
    'le'?: string; // Less than or equal
}

export interface AsaasError {
    errors: Array<{
        code: string;
        description: string;
    }>;
}

export interface AsaasConfig {
    apiKey: string;
    environment?: 'production' | 'sandbox';
    baseUrl?: string;
}
