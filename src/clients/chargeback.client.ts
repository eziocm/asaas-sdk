import { AsaasHttpClient } from '../utils/http-client';
import { Chargeback, ListChargebacksParams } from '../types/chargeback';
import { PaginatedResponse } from '../types/common';

export class ChargebackClient {
    constructor(private http: AsaasHttpClient) { }

    /**
     * List chargebacks
     * @param params - Query parameters
     * @returns Paginated list of chargebacks
     */
    async list(params?: ListChargebacksParams): Promise<PaginatedResponse<Chargeback>> {
        return this.http.get<PaginatedResponse<Chargeback>>('/chargebacks', params as unknown as Record<string, string>);
    }

    /**
     * Get chargeback by ID
     * @param id - Chargeback ID
     * @returns Chargeback details
     */
    async get(id: string): Promise<Chargeback> {
        return this.http.get<Chargeback>(`/chargebacks/${id}`);
    }
}
