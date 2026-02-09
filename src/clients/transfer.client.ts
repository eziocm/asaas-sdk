/**
 * Transfer Client - Handles all transfer-related operations
 */

import { AsaasHttpClient } from '../utils/http-client';
import {
    Transfer,
    TransferData,
    TransferListParams,
    PaginatedResponse,
} from '../types';

export class TransferClient {
    constructor(private http: AsaasHttpClient) { }

    /**
     * Create a new transfer
     */
    async create(data: TransferData): Promise<Transfer> {
        return this.http.post<Transfer>('/transfers', data);
    }

    /**
     * List transfers with optional filters
     */
    async list(params?: TransferListParams): Promise<PaginatedResponse<Transfer>> {
        const query: Record<string, string> = {};

        if (params) {
            if (params.status) query.status = params.status;
            if (params.dateCreated) query.dateCreated = params.dateCreated;
            if (params.transferDate) query.transferDate = params.transferDate;
            if (params.offset !== undefined) query.offset = params.offset.toString();
            if (params.limit !== undefined) query.limit = params.limit.toString();
        }

        return this.http.get<PaginatedResponse<Transfer>>('/transfers', query);
    }

    /**
     * Get a single transfer by ID
     */
    async get(id: string): Promise<Transfer> {
        return this.http.get<Transfer>(`/transfers/${id}`);
    }

    /**
     * Cancel a transfer
     */
    async cancel(id: string): Promise<Transfer> {
        return this.http.post<Transfer>(`/transfers/${id}/cancel`);
    }
}
