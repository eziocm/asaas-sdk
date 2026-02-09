/**
 * Invoice-related types
 */

import { InvoiceStatus, DateRangeFilter } from './common';

export interface InvoiceTaxes {
    retainIss: boolean;
    iss: number;
    cofins: number;
    csll: number;
    inss: number;
    ir: number;
    pis: number;
}

export interface InvoiceData {
    payment?: string;
    installment?: string;
    customer?: string;
    serviceDescription: string;
    observations?: string;
    value: number;
    deductions?: number;
    effectiveDate: string;
    municipalServiceId?: number;
    municipalServiceCode?: string;
    municipalServiceName?: string;
    updatePayment?: boolean;
    externalReference?: string;
    taxes?: InvoiceTaxes;
}

export interface Invoice extends InvoiceData {
    object: 'invoice';
    id: string;
    status: InvoiceStatus;
    dateCreated: string;
    number?: string;
    rpsSerie?: string;
    rpsNumber?: string;
    pdfUrl?: string;
    xmlUrl?: string;
}

export interface InvoiceListParams {
    effectiveDate?: DateRangeFilter;
    status?: InvoiceStatus;
    payment?: string;
    installment?: string;
    customer?: string;
    externalReference?: string;
    offset?: number;
    limit?: number;
}

export interface InvoiceUpdateData {
    serviceDescription?: string;
    observations?: string;
    value?: number;
    deductions?: number;
    effectiveDate?: string;
    municipalServiceId?: number;
    municipalServiceCode?: string;
    municipalServiceName?: string;
    externalReference?: string;
    taxes?: Partial<InvoiceTaxes>;
}

export interface MunicipalService {
    id: number;
    name: string;
    code: string;
}

export interface FiscalInfoData {
    municipalInscription: string;
    simplesNacional: boolean;
    culturalProjectsPromoter: boolean;
    cnae: string;
    specialRegime?: string;
    serviceListItem?: string;
    rpsSerie?: string;
    rpsNumber?: number;
    loteNumber?: number;
    username?: string;
    password?: string;
    accessToken?: string;
    certificateFile?: string;
    certificatePassword?: string;
}

export interface FiscalInfo extends FiscalInfoData {
    object: 'fiscalInfo';
    environment: string;
}
