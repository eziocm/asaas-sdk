/**
 * Anticipation-related types
 */

export type AnticipationStatus = 'PENDING' | 'APPROVED' | 'DENIED' | 'CANCELLED';

export interface AnticipationData {
    payment?: string;
    installment?: string;
    billingType?: 'BOLETO' | 'CREDIT_CARD';
    anticipationDays?: number;
}

export interface Anticipation {
    object: 'anticipation';
    id: string;
    dateCreated: string;
    status: AnticipationStatus;
    requestDate: string;
    anticipationDate?: string;
    value: number;
    netValue: number;
    fee: number;
    billingType: 'BOLETO' | 'CREDIT_CARD';
}

export interface AnticipationSimulation {
    totalValue: number;
    netValue: number;
    fee: number;
    anticipationDays: number;
}

export interface AnticipationListParams {
    status?: AnticipationStatus;
    offset?: number;
    limit?: number;
}

export interface AnticipationLimits {
    creditCard: {
        available: number;
        total: number;
    };
    boleto: {
        available: number;
        total: number;
    };
}

export interface AutomaticAnticipationConfig {
    enabled: boolean;
}
