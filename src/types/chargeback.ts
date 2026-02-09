export interface Chargeback {
    id: string;
    payment: string;
    installment?: string;
    reason: string;
    status: 'ANALYSIS' | 'APPROVED' | 'DENIED' | 'CANCELLED';
    createdDate: string;
    refundDate?: string;
    deadline?: string;
    paymentDate?: string;
    value?: number;
}

export interface ListChargebacksParams {
    paymentId?: string;
    installmentId?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    offset?: number;
    limit?: number;
}
