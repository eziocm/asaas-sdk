/**
 * PIX Client - Handles all PIX-related operations
 */

import { AsaasHttpClient } from '../utils/http-client';
import {
    PixAddressKey,
    PixAddressKeyData,
    PixTransaction,
    PixTransactionData,
    PixQrCodeDecoded,
    PixTransactionListParams,
    PixAutomaticDebitAuthorization,
    PixAutomaticDebitAuthorizationData,
    PixAutomaticDebitAuthorizationListParams,
    PixPaymentInstruction,
    PaginatedResponse,
    DeletedResponse,
} from '../types';

export class PixClient {
    constructor(private http: AsaasHttpClient) { }

    // ========== PIX Address Keys ==========

    /**
     * Create a PIX address key
     */
    async createAddressKey(data: PixAddressKeyData): Promise<PixAddressKey> {
        return this.http.post<PixAddressKey>('/pix/addressKeys', data);
    }

    /**
     * List PIX address keys
     */
    async listAddressKeys(): Promise<PaginatedResponse<PixAddressKey>> {
        return this.http.get<PaginatedResponse<PixAddressKey>>('/pix/addressKeys');
    }

    /**
     * Get a single PIX address key
     */
    async getAddressKey(id: string): Promise<PixAddressKey> {
        return this.http.get<PixAddressKey>(`/pix/addressKeys/${id}`);
    }

    /**
     * Delete a PIX address key
     */
    async deleteAddressKey(id: string): Promise<DeletedResponse> {
        return this.http.delete<DeletedResponse>(`/pix/addressKeys/${id}`);
    }

    // ========== PIX Transactions ==========

    /**
     * Pay a PIX QR Code
     */
    async createTransaction(data: PixTransactionData): Promise<PixTransaction> {
        return this.http.post<PixTransaction>('/pix/transactions', data);
    }

    /**
     * Decode a PIX QR Code
     */
    async decodeQrCode(payload: string): Promise<PixQrCodeDecoded> {
        return this.http.post<PixQrCodeDecoded>('/pix/qrCodes/decode', { payload });
    }

    /**
     * Get a single PIX transaction
     */
    async getTransaction(id: string): Promise<PixTransaction> {
        return this.http.get<PixTransaction>(`/pix/transactions/${id}`);
    }

    /**
     * List PIX transactions
     */
    async listTransactions(params?: PixTransactionListParams): Promise<PaginatedResponse<PixTransaction>> {
        const query: Record<string, string> = {};

        if (params) {
            if (params.type) query.type = params.type;
            if (params.status) query.status = params.status;
            if (params.startDate) query.startDate = params.startDate;
            if (params.endDate) query.endDate = params.endDate;
            if (params.offset !== undefined) query.offset = params.offset.toString();
            if (params.limit !== undefined) query.limit = params.limit.toString();
        }

        return this.http.get<PaginatedResponse<PixTransaction>>('/pix/transactions', query);
    }

    /**
     * Cancel a scheduled PIX transaction
     */
    async cancelTransaction(id: string): Promise<PixTransaction> {
        return this.http.post<PixTransaction>(`/pix/transactions/${id}/cancel`);
    }

    // ========== PIX Automatic Debit ==========

    /**
     * Create a PIX automatic debit authorization
     */
    async createAuthorization(data: PixAutomaticDebitAuthorizationData): Promise<PixAutomaticDebitAuthorization> {
        return this.http.post<PixAutomaticDebitAuthorization>('/pix/automaticDebit/authorizations', data);
    }

    /**
     * List PIX automatic debit authorizations
     */
    async listAuthorizations(
        params?: PixAutomaticDebitAuthorizationListParams
    ): Promise<PaginatedResponse<PixAutomaticDebitAuthorization>> {
        const query: Record<string, string> = {};

        if (params) {
            if (params.customer) query.customer = params.customer;
            if (params.status) query.status = params.status;
            if (params.offset !== undefined) query.offset = params.offset.toString();
            if (params.limit !== undefined) query.limit = params.limit.toString();
        }

        return this.http.get<PaginatedResponse<PixAutomaticDebitAuthorization>>(
            '/pix/automaticDebit/authorizations',
            query
        );
    }

    /**
     * Get a single PIX automatic debit authorization
     */
    async getAuthorization(id: string): Promise<PixAutomaticDebitAuthorization> {
        return this.http.get<PixAutomaticDebitAuthorization>(`/pix/automaticDebit/authorizations/${id}`);
    }

    /**
     * Cancel a PIX automatic debit authorization
     */
    async cancelAuthorization(id: string): Promise<DeletedResponse> {
        return this.http.delete<DeletedResponse>(`/pix/automaticDebit/authorizations/${id}`);
    }

    /**
     * Get a PIX payment instruction
     */
    async getPaymentInstruction(id: string): Promise<PixPaymentInstruction> {
        return this.http.get<PixPaymentInstruction>(`/pix/automaticDebit/paymentInstructions/${id}`);
    }

    /**
     * List PIX payment instructions
     */
    async listPaymentInstructions(): Promise<PaginatedResponse<PixPaymentInstruction>> {
        return this.http.get<PaginatedResponse<PixPaymentInstruction>>('/pix/automaticDebit/paymentInstructions');
    }
}
