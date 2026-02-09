/**
 * PIX-related types
 */

import {
    PixKeyType,
    PixTransactionType,
    PixTransactionStatus,
    PixAuthorizationStatus,
    PixInstructionStatus,
} from './common';

// PIX Address Keys
export interface PixAddressKeyData {
    type: PixKeyType;
}

export interface PixAddressKey {
    id: string;
    type: PixKeyType;
    key: string;
    status: 'AWAITING_ACTIVATION' | 'ACTIVE' | 'DELETED';
    dateCreated: string;
}

// PIX Transactions
export interface PixQrCodePayload {
    payload: string;
}

export interface PixTransactionData {
    qrCode: PixQrCodePayload;
    value?: number;
    description?: string;
    scheduleDate?: string;
}

export interface PixTransaction {
    id: string;
    type: PixTransactionType;
    value: number;
    status: PixTransactionStatus;
    description?: string;
    scheduleDate?: string;
    dateCreated: string;
    effectiveDate?: string;
    endToEndIdentifier?: string;
    qrCode?: PixQrCodePayload;
}

export interface PixQrCodeDecoded {
    payload: string;
    value?: number;
    dueDate?: string;
    expirationDate?: string;
    canBePaidWithDifferentValue: boolean;
    recipient?: {
        name: string;
        cpfCnpj: string;
    };
}

export interface PixTransactionListParams {
    type?: PixTransactionType;
    status?: PixTransactionStatus;
    startDate?: string;
    endDate?: string;
    offset?: number;
    limit?: number;
}

// PIX Automatic Debit
export interface PixAutomaticDebitAuthorizationData {
    customer: string;
    value: number;
    description?: string;
    externalReference?: string;
    scheduleDate?: string;
    billingInfo?: {
        name: string;
        cpfCnpj: string;
    };
}

export interface PixAutomaticDebitAuthorization {
    id: string;
    customer: string;
    value: number;
    status: PixAuthorizationStatus;
    description?: string;
    externalReference?: string;
    scheduleDate?: string;
    dateCreated: string;
    authorizationUrl?: string;
    qrCode?: {
        encodedImage: string;
        payload: string;
        expirationDate: string;
    };
}

export interface PixAutomaticDebitAuthorizationListParams {
    customer?: string;
    status?: PixAuthorizationStatus;
    offset?: number;
    limit?: number;
}

export interface PixPaymentInstruction {
    id: string;
    authorization: string;
    value: number;
    status: PixInstructionStatus;
    dueDate: string;
    paymentDate?: string;
}
