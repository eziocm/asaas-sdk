/**
 * Subaccount Client - Handles all subaccount-related operations
 */

import { AsaasHttpClient } from '../utils/http-client';
import {
    Subaccount,
    SubaccountData,
    SubaccountListParams,
    PaginatedResponse,
} from '../types';

export class SubaccountClient {
    constructor(private http: AsaasHttpClient) { }

    /**
     * Create a new subaccount
     */
    async create(data: SubaccountData): Promise<Subaccount> {
        return this.http.post<Subaccount>('/subaccounts', data);
    }

    /**
     * List subaccounts with optional filters
     */
    async list(params?: SubaccountListParams): Promise<PaginatedResponse<Subaccount>> {
        const query: Record<string, string> = {};

        if (params) {
            if (params.email) query.email = params.email;
            if (params.cpfCnpj) query.cpfCnpj = params.cpfCnpj;
            if (params.offset !== undefined) query.offset = params.offset.toString();
            if (params.limit !== undefined) query.limit = params.limit.toString();
        }

        return this.http.get<PaginatedResponse<Subaccount>>('/subaccounts', query);
    }

    /**
     * Get a single subaccount by ID
     */
    async get(id: string): Promise<Subaccount> {
        return this.http.get<Subaccount>(`/subaccounts/${id}`);
    }

    /**
     * Update a subaccount
     */
    async update(id: string, data: Partial<SubaccountData>): Promise<Subaccount> {
        return this.http.put<Subaccount>(`/subaccounts/${id}`, data);
    }

    /**
     * Get subaccount documents
     */
    async getDocuments(id: string): Promise<any> {
        return this.http.get(`/subaccounts/${id}/documents`);
    }

    /**
     * Send documents for a subaccount
     */
    async sendDocuments(id: string, data: any): Promise<any> {
        return this.http.post(`/subaccounts/${id}/documents`, data);
    }
}
