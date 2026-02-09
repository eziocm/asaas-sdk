/**
 * Subaccount-related types
 */

export interface SubaccountData {
    name: string;
    email: string;
    cpfCnpj: string;
    birthDate?: string;
    companyType?: string;
    phone?: string;
    mobilePhone?: string;
    address?: string;
    addressNumber?: string;
    complement?: string;
    province?: string;
    postalCode?: string;
    incomeValue?: number;
    site?: string;
}

export interface Subaccount {
    object: 'account';
    id: string;
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

export interface SubaccountListParams {
    email?: string;
    cpfCnpj?: string;
    offset?: number;
    limit?: number;
}
