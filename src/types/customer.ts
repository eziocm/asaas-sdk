/**
 * Customer-related types
 */

export interface CustomerData {
    name: string;
    email: string;
    cpfCnpj: string;
    mobilePhone?: string;
    phone?: string;
    address?: string;
    addressNumber?: string;
    complement?: string;
    province?: string;
    postalCode?: string;
    externalReference?: string;
    notificationDisabled?: boolean;
    additionalEmails?: string;
    observations?: string;
}

export interface Customer extends CustomerData {
    object: 'customer';
    id: string;
    dateCreated: string;
    deleted?: boolean;
}

export interface CustomerListParams {
    name?: string;
    email?: string;
    cpfCnpj?: string;
    offset?: number;
    limit?: number;
}
