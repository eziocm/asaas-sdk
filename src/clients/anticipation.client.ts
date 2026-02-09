/**
 * Anticipation Client - Handles all anticipation-related operations
 */

import { AsaasHttpClient } from '../utils/http-client';
import {
    Anticipation,
    AnticipationData,
    AnticipationSimulation,
    AnticipationListParams,
    AnticipationLimits,
    AutomaticAnticipationConfig,
    PaginatedResponse,
} from '../types';

export class AnticipationClient {
    constructor(private http: AsaasHttpClient) { }

    /**
     * Request an anticipation
     */
    async create(data: AnticipationData): Promise<Anticipation> {
        return this.http.post<Anticipation>('/anticipations', data);
    }

    /**
     * List anticipations with optional filters
     */
    async list(params?: AnticipationListParams): Promise<PaginatedResponse<Anticipation>> {
        const query: Record<string, string> = {};

        if (params) {
            if (params.status) query.status = params.status;
            if (params.offset !== undefined) query.offset = params.offset.toString();
            if (params.limit !== undefined) query.limit = params.limit.toString();
        }

        return this.http.get<PaginatedResponse<Anticipation>>('/anticipations', query);
    }

    /**
     * Get a single anticipation by ID
     */
    async get(id: string): Promise<Anticipation> {
        return this.http.get<Anticipation>(`/anticipations/${id}`);
    }

    /**
     * Simulate an anticipation
     */
    async simulate(data: AnticipationData): Promise<AnticipationSimulation> {
        return this.http.post<AnticipationSimulation>('/anticipations/simulate', data);
    }

    /**
     * Cancel an anticipation
     */
    async cancel(id: string): Promise<Anticipation> {
        return this.http.post<Anticipation>(`/anticipations/${id}/cancel`);
    }

    /**
     * Get automatic anticipation status
     */
    async getAutomatic(): Promise<AutomaticAnticipationConfig> {
        return this.http.get<AutomaticAnticipationConfig>('/anticipations/automatic');
    }

    /**
     * Update automatic anticipation status
     */
    async updateAutomatic(enabled: boolean): Promise<AutomaticAnticipationConfig> {
        return this.http.put<AutomaticAnticipationConfig>('/anticipations/automatic', { enabled });
    }

    /**
     * Get anticipation limits
     */
    async getLimits(): Promise<AnticipationLimits> {
        return this.http.get<AnticipationLimits>('/anticipations/limits');
    }
}
