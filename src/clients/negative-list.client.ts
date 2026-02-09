import { AsaasHttpClient } from '../utils/http-client';
import { NegativeList, CreateNegativeList, ListNegativeListParams } from '../types/negative-list';
import { PaginatedResponse } from '../types/common';

export class NegativeListClient {
    constructor(private http: AsaasHttpClient) { }

    /**
     * Request negative list for a payment (Negativação)
     * @param data - Negative list creation data (paymentId, description)
     * @returns Negative list request details
     */
    async create(data: CreateNegativeList): Promise<NegativeList> {
        return this.http.post<NegativeList>('/negativeList', data);
    }

    /**
     * Remove negative list (Denegativação)
     * @param id - Negative list ID
     * @returns Removal confirmation
     */
    async delete(id: string): Promise<void> {
        return this.http.delete(`/negativeList/${id}`);
    }

    /**
     * List negative list requests
     * @param params - Query parameters
     * @returns Paginated list of negative list requests
     */
    async list(params?: ListNegativeListParams): Promise<PaginatedResponse<NegativeList>> {
        return this.http.get<PaginatedResponse<NegativeList>>('/negativeList', params as unknown as Record<string, string>);
    }

    /**
     * Get negative list request by ID
     * @param id - Negative list ID
     * @returns Negative list request details
     */
    async get(id: string): Promise<NegativeList> {
        return this.http.get<NegativeList>(`/negativeList/${id}`);
    }
}
