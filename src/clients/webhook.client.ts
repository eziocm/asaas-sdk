/**
 * Webhook Client - Handles all webhook-related operations
 */

import { AsaasHttpClient } from '../utils/http-client';
import {
    Webhook,
    WebhookData,
    WebhookUpdateData,
    PaginatedResponse,
    DeletedResponse,
} from '../types';

export class WebhookClient {
    constructor(private http: AsaasHttpClient) { }

    /**
     * Create a new webhook
     */
    async create(data: WebhookData): Promise<Webhook> {
        return this.http.post<Webhook>('/webhooks', data);
    }

    /**
     * List all webhooks
     */
    async list(): Promise<PaginatedResponse<Webhook>> {
        return this.http.get<PaginatedResponse<Webhook>>('/webhooks');
    }

    /**
     * Get a single webhook by ID
     */
    async get(id: string): Promise<Webhook> {
        return this.http.get<Webhook>(`/webhooks/${id}`);
    }

    /**
     * Update an existing webhook
     */
    async update(id: string, data: WebhookUpdateData): Promise<Webhook> {
        return this.http.put<Webhook>(`/webhooks/${id}`, data);
    }

    /**
     * Delete a webhook
     */
    async delete(id: string): Promise<DeletedResponse> {
        return this.http.delete<DeletedResponse>(`/webhooks/${id}`);
    }

    /**
     * Remove webhook backoff (penalty)
     */
    async removeBackoff(id: string): Promise<Webhook> {
        return this.http.post<Webhook>(`/webhooks/${id}/removeBackoff`);
    }
}
