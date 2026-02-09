/**
 * Account and Finance-related types
 */

export interface AccountInfo {
    object: 'account';
    name: string;
    email: string;
    loginEmail: string;
    cpfCnpj: string;
    birthDate?: string;
    phone?: string;
    mobilePhone?: string;
    address?: string;
    addressNumber?: string;
    complement?: string;
    province?: string;
    postalCode?: string;
    personType: 'FISICA' | 'JURIDICA';
    companyType?: string;
    city?: number;
    state?: string;
    country?: string;
    apiKey?: string;
    walletId?: string;
}

export interface FinancialBalance {
    balance: number;
}

export interface FinancialTransaction {
    object: 'financialTransaction';
    id: string;
    date: string;
    type: string;
    value: number;
    balance: number;
    description: string;
    payment?: string;
    transfer?: string;
    installment?: string;
    subscription?: string;
}

export interface FinancialTransactionListParams {
    startDate?: string;
    finishDate?: string;
    type?: string;
    offset?: number;
    limit?: number;
}

export interface AccountConfig {
    name?: string;
    email?: string;
    phone?: string;
    mobilePhone?: string;
    address?: string;
    addressNumber?: string;
    complement?: string;
    province?: string;
    postalCode?: string;
}
