/**
 * Refund Client - Handles all refund-related operations
 */

import { AsaasHttpClient } from '../utils/http-client';
import {
    Refund,
    RefundData,
    RefundListParams,
    PaginatedResponse,
} from '../types';

export class RefundClient {
    constructor(private http: AsaasHttpClient) { }

    /**
     * Refund a payment
     */
    async refundPayment(paymentId: string, data?: RefundData): Promise<Refund> {
        return this.http.post<Refund>(`/payments/${paymentId}/refund`, data);
    }

    /**
     * Refund an installment
     */
    async refundInstallment(installmentId: string, data?: RefundData): Promise<Refund> {
        return this.http.post<Refund>(`/installments/${installmentId}/refund`, data);
    }

    /**
     * List refunds for a payment
     */
    async listPaymentRefunds(
        paymentId: string,
        params?: RefundListParams
    ): Promise<PaginatedResponse<Refund>> {
        const query: Record<string, string> = {};

        if (params) {
            if (params.offset !== undefined) query.offset = params.offset.toString();
            if (params.limit !== undefined) query.limit = params.limit.toString();
        }

        return this.http.get<PaginatedResponse<Refund>>(`/payments/${paymentId}/refunds`, query);
    }
}
