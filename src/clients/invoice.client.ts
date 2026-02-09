/**
 * Invoice Client - Handles all invoice-related operations
 */

import { AsaasHttpClient } from '../utils/http-client';
import {
    Invoice,
    InvoiceData,
    InvoiceListParams,
    InvoiceUpdateData,
    MunicipalService,
    FiscalInfo,
    FiscalInfoData,
    PaginatedResponse,
} from '../types';

export class InvoiceClient {
    constructor(private http: AsaasHttpClient) { }

    // ========== Invoice CRUD ==========

    /**
     * Schedule (create) a new invoice
     */
    async create(data: InvoiceData): Promise<Invoice> {
        return this.http.post<Invoice>('/invoices', data);
    }

    /**
     * List invoices with optional filters
     */
    async list(params?: InvoiceListParams): Promise<PaginatedResponse<Invoice>> {
        const query: Record<string, string> = {};

        if (params) {
            if (params.effectiveDate) {
                if (params.effectiveDate.ge) query['effectiveDate[ge]'] = params.effectiveDate.ge;
                if (params.effectiveDate.le) query['effectiveDate[le]'] = params.effectiveDate.le;
            }

            if (params.status) query.status = params.status;
            if (params.payment) query.payment = params.payment;
            if (params.installment) query.installment = params.installment;
            if (params.customer) query.customer = params.customer;
            if (params.externalReference) query.externalReference = params.externalReference;
            if (params.offset !== undefined) query.offset = params.offset.toString();
            if (params.limit !== undefined) query.limit = params.limit.toString();
        }

        return this.http.get<PaginatedResponse<Invoice>>('/invoices', query);
    }

    /**
     * Get a single invoice by ID
     */
    async get(id: string): Promise<Invoice> {
        return this.http.get<Invoice>(`/invoices/${id}`);
    }

    /**
     * Update a scheduled or error-status invoice
     */
    async update(id: string, data: InvoiceUpdateData): Promise<Invoice> {
        return this.http.put<Invoice>(`/invoices/${id}`, data);
    }

    // ========== Invoice Actions ==========

    /**
     * Authorize (issue) a scheduled invoice
     */
    async authorize(id: string): Promise<Invoice> {
        return this.http.post<Invoice>(`/invoices/${id}/authorize`);
    }

    /**
     * Cancel an invoice
     */
    async cancel(id: string): Promise<Invoice> {
        return this.http.post<Invoice>(`/invoices/${id}/cancel`);
    }

    // ========== Municipal Services ==========

    /**
     * List available municipal services for invoice generation
     */
    async listMunicipalServices(): Promise<PaginatedResponse<MunicipalService>> {
        return this.http.get<PaginatedResponse<MunicipalService>>('/invoices/municipalServices');
    }

    // ========== Fiscal Info ==========

    /**
     * Configure invoice fiscal information for the national portal
     */
    async configureFiscalInfo(data: FiscalInfoData): Promise<FiscalInfo> {
        return this.http.post<FiscalInfo>('/fiscalInfo/nationalPortal', data);
    }
}
