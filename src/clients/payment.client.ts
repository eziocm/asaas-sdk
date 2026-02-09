/**
 * Payment Client - Handles all payment-related operations
 */

import { AsaasHttpClient } from '../utils/http-client';
import {
    Payment,
    PaymentData,
    PaymentListParams,
    PaymentUpdateData,
    PaymentStatusResponse,
    PixQrCode,
    PaginatedResponse,
    DeletedResponse,
} from '../types';

export class PaymentClient {
    constructor(private http: AsaasHttpClient) { }

    /**
     * Create a new payment
     */
    async create(data: PaymentData): Promise<Payment> {
        return this.http.post<Payment>('/payments', data);
    }

    /**
     * List payments with optional filters
     */
    async list(params?: PaymentListParams): Promise<PaginatedResponse<Payment>> {
        const query: Record<string, string> = {};

        if (params) {
            if (params.customer) query.customer = params.customer;
            if (params.billingType) query.billingType = params.billingType;
            if (params.status) query.status = params.status;
            if (params.subscription) query.subscription = params.subscription;
            if (params.installment) query.installment = params.installment;
            if (params.externalReference) query.externalReference = params.externalReference;

            // Date range filters
            if (params.paymentDate) {
                if (params.paymentDate.ge) query['paymentDate[ge]'] = params.paymentDate.ge;
                if (params.paymentDate.le) query['paymentDate[le]'] = params.paymentDate.le;
            }
            if (params.estimatedCreditDate) {
                if (params.estimatedCreditDate.ge) query['estimatedCreditDate[ge]'] = params.estimatedCreditDate.ge;
                if (params.estimatedCreditDate.le) query['estimatedCreditDate[le]'] = params.estimatedCreditDate.le;
            }
            if (params.dueDate) {
                if (params.dueDate.ge) query['dueDate[ge]'] = params.dueDate.ge;
                if (params.dueDate.le) query['dueDate[le]'] = params.dueDate.le;
            }

            if (params.offset !== undefined) query.offset = params.offset.toString();
            if (params.limit !== undefined) query.limit = params.limit.toString();
        }

        return this.http.get<PaginatedResponse<Payment>>('/payments', query);
    }

    /**
     * Get a single payment by ID
     */
    async get(id: string): Promise<Payment> {
        return this.http.get<Payment>(`/payments/${id}`);
    }

    /**
     * Update an existing payment
     */
    async update(id: string, data: PaymentUpdateData): Promise<Payment> {
        return this.http.put<Payment>(`/payments/${id}`, data);
    }

    /**
     * Delete a payment
     */
    async delete(id: string): Promise<DeletedResponse> {
        return this.http.delete<DeletedResponse>(`/payments/${id}`);
    }

    /**
     * Restore a deleted payment
     */
    async restore(id: string): Promise<Payment> {
        return this.http.post<Payment>(`/payments/${id}/restore`);
    }

    /**
     * Get payment status
     */
    async getStatus(id: string): Promise<PaymentStatusResponse> {
        return this.http.get<PaymentStatusResponse>(`/payments/${id}/status`);
    }

    /**
     * Get PIX QR Code for a payment
     */
    async getPixQrCode(id: string): Promise<PixQrCode> {
        return this.http.get<PixQrCode>(`/payments/${id}/pixQrCode`);
    }

    /**
     * Get boleto identification field (linha digitável)
     */
    async getIdentificationField(id: string): Promise<any> {
        return this.http.get(`/payments/${id}/identificationField`);
    }

    /**
     * Confirm payment received in cash
     */
    async receiveInCash(id: string, data?: { paymentDate?: string; value?: number }): Promise<Payment> {
        return this.http.post<Payment>(`/payments/${id}/receiveInCash`, data);
    }

    /**
     * Undo cash payment confirmation
     */
    async undoReceivedInCash(id: string): Promise<Payment> {
        return this.http.post<Payment>(`/payments/${id}/undoReceivedInCash`);
    }

    /**
     * Get billing info
     */
    async getBillingInfo(id: string): Promise<any> {
        return this.http.get(`/payments/${id}/billingInfo`);
    }

    /**
     * Get viewing info
     */
    async getViewingInfo(id: string): Promise<any> {
        return this.http.get(`/payments/${id}/viewingInfo`);
    }
}
