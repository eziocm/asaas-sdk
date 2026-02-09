/**
 * Customer Client - Handles all customer-related operations
 */

import { AsaasHttpClient } from '../utils/http-client';
import {
    Customer,
    CustomerData,
    CustomerListParams,
    PaginatedResponse,
    DeletedResponse,
} from '../types';

export class CustomerClient {
    constructor(private http: AsaasHttpClient) { }

    /**
     * Create a new customer
     */
    async create(data: CustomerData): Promise<Customer> {
        return this.http.post<Customer>('/customers', data);
    }

    /**
     * List customers with optional filters
     */
    async list(params?: CustomerListParams): Promise<PaginatedResponse<Customer>> {
        const query: Record<string, string> = {};

        if (params) {
            if (params.name) query.name = params.name;
            if (params.email) query.email = params.email;
            if (params.cpfCnpj) query.cpfCnpj = params.cpfCnpj;
            if (params.offset !== undefined) query.offset = params.offset.toString();
            if (params.limit !== undefined) query.limit = params.limit.toString();
        }

        return this.http.get<PaginatedResponse<Customer>>('/customers', query);
    }

    /**
     * Get a single customer by ID
     */
    async get(id: string): Promise<Customer> {
        return this.http.get<Customer>(`/customers/${id}`);
    }

    /**
     * Update an existing customer
     */
    async update(id: string, data: Partial<CustomerData>): Promise<Customer> {
        return this.http.put<Customer>(`/customers/${id}`, data);
    }

    /**
     * Delete a customer
     */
    async delete(id: string): Promise<DeletedResponse> {
        return this.http.delete<DeletedResponse>(`/customers/${id}`);
    }

    /**
     * Restore a deleted customer
     */
    async restore(id: string): Promise<Customer> {
        return this.http.post<Customer>(`/customers/${id}/restore`);
    }

    /**
     * Get customer notifications
     */
    async getNotifications(id: string): Promise<any> {
        return this.http.get(`/customers/${id}/notifications`);
    }
}
