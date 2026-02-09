/**
 * Payment Link Client - Handles all payment link-related operations
 */

import { AsaasHttpClient } from '../utils/http-client';
import {
    PaymentLink,
    PaymentLinkData,
    PaymentLinkListParams,
    PaymentLinkUpdateData,
    PaginatedResponse,
    DeletedResponse,
} from '../types';

export class PaymentLinkClient {
    constructor(private http: AsaasHttpClient) { }

    /**
     * Create a new payment link
     */
    async create(data: PaymentLinkData): Promise<PaymentLink> {
        return this.http.post<PaymentLink>('/paymentLinks', data);
    }

    /**
     * List payment links with optional filters
     */
    async list(params?: PaymentLinkListParams): Promise<PaginatedResponse<PaymentLink>> {
        const query: Record<string, string> = {};

        if (params) {
            if (params.name) query.name = params.name;
            if (params.active !== undefined) query.active = params.active.toString();
            if (params.includeDeleted !== undefined) query.includeDeleted = params.includeDeleted.toString();
            if (params.offset !== undefined) query.offset = params.offset.toString();
            if (params.limit !== undefined) query.limit = params.limit.toString();
        }

        return this.http.get<PaginatedResponse<PaymentLink>>('/paymentLinks', query);
    }

    /**
     * Get a single payment link by ID
     */
    async get(id: string): Promise<PaymentLink> {
        return this.http.get<PaymentLink>(`/paymentLinks/${id}`);
    }

    /**
     * Update an existing payment link
     */
    async update(id: string, data: PaymentLinkUpdateData): Promise<PaymentLink> {
        return this.http.put<PaymentLink>(`/paymentLinks/${id}`, data);
    }

    /**
     * Delete a payment link
     */
    async delete(id: string): Promise<DeletedResponse> {
        return this.http.delete<DeletedResponse>(`/paymentLinks/${id}`);
    }

    /**
     * Restore a deleted payment link
     */
    async restore(id: string): Promise<PaymentLink> {
        return this.http.post<PaymentLink>(`/paymentLinks/${id}/restore`);
    }

    /**
     * Remove an image from a payment link
     */
    async removeImage(paymentLinkId: string, imageId: string): Promise<DeletedResponse> {
        return this.http.delete<DeletedResponse>(`/paymentLinks/${paymentLinkId}/images/${imageId}`);
    }
}
