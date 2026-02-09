/**
 * Account Client - Handles account and finance-related operations
 */

import { AsaasHttpClient } from '../utils/http-client';
import {
    AccountInfo,
    AccountConfig,
    FinancialBalance,
    FinancialTransaction,
    FinancialTransactionListParams,
    PaginatedResponse,
} from '../types';

export class AccountClient {
    constructor(private http: AsaasHttpClient) { }

    /**
     * Get account information
     */
    async getInfo(): Promise<AccountInfo> {
        return this.http.get<AccountInfo>('/myAccount');
    }

    /**
     * Get financial balance
     */
    async getBalance(): Promise<FinancialBalance> {
        return this.http.get<FinancialBalance>('/finance/balance');
    }

    /**
     * Get financial transactions (statement)
     */
    async getTransactions(
        params?: FinancialTransactionListParams
    ): Promise<PaginatedResponse<FinancialTransaction>> {
        const query: Record<string, string> = {};

        if (params) {
            if (params.startDate) query.startDate = params.startDate;
            if (params.finishDate) query.finishDate = params.finishDate;
            if (params.type) query.type = params.type;
            if (params.offset !== undefined) query.offset = params.offset.toString();
            if (params.limit !== undefined) query.limit = params.limit.toString();
        }

        return this.http.get<PaginatedResponse<FinancialTransaction>>('/financialTransactions', query);
    }

    /**
     * Update account configuration
     */
    async updateConfig(data: AccountConfig): Promise<AccountInfo> {
        return this.http.put<AccountInfo>('/myAccount', data);
    }
}
