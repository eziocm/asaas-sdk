/**
 * Refund-related types
 */

export type RefundStatus = 'PENDING' | 'DONE' | 'CANCELLED' | 'FAILED';

export interface RefundData {
    value?: number;
    description?: string;
}

export interface Refund {
    object: 'refund';
    id: string;
    dateCreated: string;
    payment: string;
    value: number;
    description?: string;
    status: RefundStatus;
    transactionReceiptUrl?: string;
    refundDate?: string;
}

export interface RefundListParams {
    offset?: number;
    limit?: number;
}
