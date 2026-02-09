export interface NegativeList {
    id: string;
    payment: string;
    customer?: string;
    status: 'PENDING' | 'PROCESSED' | 'FAILED' | 'REMOVED' | 'DENIED';
    value: number;
    netValue?: number;
    createdDate: string;
    removedDate?: string;
    denialReason?: string;
}

export interface CreateNegativeList {
    payment: string;
    description?: string;
    // Outros campos relevantes podem ser adicionados conforme a documentação detalhada
}

export interface ListNegativeListParams {
    paymentId?: string;
    status?: string;
    offset?: number;
    limit?: number;
}
