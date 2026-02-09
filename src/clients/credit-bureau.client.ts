import { AsaasHttpClient } from '../utils/http-client';
import { CreditBureauReport, CreateCreditBureauReport, ListCreditBureauReportParams } from '../types/credit-bureau';
import { PaginatedResponse } from '../types/common';

export class CreditBureauClient {
    constructor(private http: AsaasHttpClient) { }

    /**
     * Request a credit bureau report
     * @param data - Request data
     * @returns Credit bureau report details
     */
    async create(data: CreateCreditBureauReport): Promise<CreditBureauReport> {
        return this.http.post<CreditBureauReport>('/creditBureauReport', data);
    }

    /**
     * List credit bureau reports
     * @param params - Query parameters
     * @returns Paginated list of reports
     */
    async list(params?: ListCreditBureauReportParams): Promise<PaginatedResponse<CreditBureauReport>> {
        return this.http.get<PaginatedResponse<CreditBureauReport>>('/creditBureauReport', params as unknown as Record<string, string>);
    }

    /**
     * Get credit bureau report by ID
     * @param id - Report ID
     * @returns Report details
     */
    async get(id: string): Promise<CreditBureauReport> {
        return this.http.get<CreditBureauReport>(`/creditBureauReport/${id}`);
    }
}
