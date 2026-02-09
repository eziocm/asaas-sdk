/**
 * Transfer-related types
 */

export type TransferType = 'BANK_ACCOUNT' | 'ASAAS_ACCOUNT';

export type TransferStatus =
    | 'PENDING'
    | 'BANK_PROCESSING'
    | 'DONE'
    | 'CANCELLED'
    | 'FAILED';

export interface BankAccount {
    bank: {
        code: string;
        ispb?: string;
    };
    accountName: string;
    ownerName: string;
    ownerBirthDate?: string;
    cpfCnpj: string;
    agency: string;
    account: string;
    accountDigit: string;
    bankAccountType: 'CONTA_CORRENTE' | 'CONTA_POUPANCA';
}

export interface TransferData {
    value: number;
    bankAccount?: BankAccount;
    operationType?: 'PIX' | 'TED' | 'INTERNAL';
    pixAddressKey?: string;
    pixAddressKeyType?: 'CPF' | 'CNPJ' | 'EMAIL' | 'PHONE' | 'EVP';
    description?: string;
    scheduleDate?: string;
}

export interface Transfer {
    object: 'transfer';
    id: string;
    dateCreated: string;
    value: number;
    netValue: number;
    status: TransferStatus;
    effectiveDate?: string;
    endToEndIdentifier?: string;
    scheduleDate?: string;
    authorized: boolean;
    failReason?: string;
    bankAccount?: BankAccount;
    transactionReceiptUrl?: string;
    operationType: 'PIX' | 'TED' | 'INTERNAL';
    description?: string;
}

export interface TransferListParams {
    status?: TransferStatus;
    dateCreated?: string;
    transferDate?: string;
    offset?: number;
    limit?: number;
}
