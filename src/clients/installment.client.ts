/**
 * Installment Client - Handles all installment-related operations
 */

import { AsaasHttpClient } from '../utils/http-client';
import {
    Installment,
    InstallmentData,
    InstallmentListParams,
    Payment,
    PaginatedResponse,
    DeletedResponse,
} from '../types';

export class InstallmentClient {
    constructor(private http: AsaasHttpClient) { }

    /**
     * Create a new installment
     */
    async create(data: InstallmentData): Promise<Installment> {
        return this.http.post<Installment>('/installments', data);
    }

    /**
     * List installments with optional filters
     */
    async list(params?: InstallmentListParams): Promise<PaginatedResponse<Installment>> {
        const query: Record<string, string> = {};

        if (params) {
            if (params.customer) query.customer = params.customer;
            if (params.billingType) query.billingType = params.billingType;
            if (params.externalReference) query.externalReference = params.externalReference;
            if (params.offset !== undefined) query.offset = params.offset.toString();
            if (params.limit !== undefined) query.limit = params.limit.toString();
        }

        return this.http.get<PaginatedResponse<Installment>>('/installments', query);
    }

    /**
     * Get a single installment by ID
     */
    async get(id: string): Promise<Installment> {
        return this.http.get<Installment>(`/installments/${id}`);
    }

    /**
     * Delete an installment
     */
    async delete(id: string): Promise<DeletedResponse> {
        return this.http.delete<DeletedResponse>(`/installments/${id}`);
    }

    /**
     * Get payments for an installment
     */
    async getPayments(id: string): Promise<PaginatedResponse<Payment>> {
        return this.http.get<PaginatedResponse<Payment>>(`/installments/${id}/payments`);
    }

    /**
     * Get payment book (carnê) for an installment
     */
    async getPaymentBook(id: string): Promise<any> {
        return this.http.get(`/installments/${id}/paymentBook`);
    }

    /**
     * Update splits for an installment
     */
    async updateSplits(id: string, data: any): Promise<Installment> {
        return this.http.put<Installment>(`/installments/${id}/splits`, data);
    }

    /**
     * Cancel pending or overdue payments from an installment
     */
    async cancelPendingPayments(id: string): Promise<any> {
        return this.http.delete(`/installments/${id}/payments`);
    }
}
