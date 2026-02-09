/**
 * Subscription Client - Handles all subscription-related operations
 */

import { AsaasHttpClient } from '../utils/http-client';
import {
    Subscription,
    SubscriptionData,
    SubscriptionWithCardData,
    SubscriptionListParams,
    SubscriptionUpdateData,
    Payment,
    PaginatedResponse,
    DeletedResponse,
} from '../types';

export class SubscriptionClient {
    constructor(private http: AsaasHttpClient) { }

    /**
     * Create a new subscription (PIX or Boleto)
     */
    async create(data: SubscriptionData): Promise<Subscription> {
        return this.http.post<Subscription>('/subscriptions', data);
    }

    /**
     * Create a subscription with credit card
     */
    async createWithCard(data: SubscriptionWithCardData): Promise<Subscription> {
        return this.http.post<Subscription>('/subscriptions', data);
    }

    /**
     * List subscriptions with optional filters
     */
    async list(params?: SubscriptionListParams): Promise<PaginatedResponse<Subscription>> {
        const query: Record<string, string> = {};

        if (params) {
            if (params.customer) query.customer = params.customer;
            if (params.billingType) query.billingType = params.billingType;
            if (params.status) query.status = params.status;
            if (params.deletedOnly !== undefined) query.deletedOnly = params.deletedOnly.toString();
            if (params.includeDeleted !== undefined) query.includeDeleted = params.includeDeleted.toString();
            if (params.externalReference) query.externalReference = params.externalReference;
            if (params.offset !== undefined) query.offset = params.offset.toString();
            if (params.limit !== undefined) query.limit = params.limit.toString();
        }

        return this.http.get<PaginatedResponse<Subscription>>('/subscriptions', query);
    }

    /**
     * Get a single subscription by ID
     */
    async get(id: string): Promise<Subscription> {
        return this.http.get<Subscription>(`/subscriptions/${id}`);
    }

    /**
     * Update an existing subscription
     */
    async update(id: string, data: SubscriptionUpdateData): Promise<Subscription> {
        return this.http.put<Subscription>(`/subscriptions/${id}`, data);
    }

    /**
     * Delete a subscription
     */
    async delete(id: string): Promise<DeletedResponse> {
        return this.http.delete<DeletedResponse>(`/subscriptions/${id}`);
    }

    /**
     * Update credit card without charging
     */
    async updateCreditCard(id: string, data: any): Promise<Subscription> {
        return this.http.put<Subscription>(`/subscriptions/${id}/creditCard`, data);
    }

    /**
     * Get payments for a subscription
     */
    async getPayments(id: string): Promise<PaginatedResponse<Payment>> {
        return this.http.get<PaginatedResponse<Payment>>(`/subscriptions/${id}/payments`);
    }

    /**
     * Get payment book (carnê) for a subscription
     */
    async getPaymentBook(id: string): Promise<any> {
        return this.http.get(`/subscriptions/${id}/paymentBook`);
    }

    /**
     * Create invoice settings for a subscription
     */
    async createInvoiceSettings(id: string, data: any): Promise<any> {
        return this.http.post(`/subscriptions/${id}/invoiceSettings`, data);
    }

    /**
     * Get invoice settings for a subscription
     */
    async getInvoiceSettings(id: string): Promise<any> {
        return this.http.get(`/subscriptions/${id}/invoiceSettings`);
    }

    /**
     * Update invoice settings for a subscription
     */
    async updateInvoiceSettings(id: string, data: any): Promise<any> {
        return this.http.put(`/subscriptions/${id}/invoiceSettings`, data);
    }

    /**
     * Delete invoice settings for a subscription
     */
    async deleteInvoiceSettings(id: string): Promise<DeletedResponse> {
        return this.http.delete<DeletedResponse>(`/subscriptions/${id}/invoiceSettings`);
    }

    /**
     * Get invoices for a subscription
     */
    async getInvoices(id: string): Promise<any> {
        return this.http.get(`/subscriptions/${id}/invoices`);
    }
}
