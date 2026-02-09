/**
 * Split Client - Provides convenience methods for split payment operations
 */

import { AsaasHttpClient } from '../utils/http-client';
import {
    Payment,
    PaymentData,
    Split,
} from '../types';

export class SplitClient {
    constructor(private http: AsaasHttpClient) { }

    /**
     * Create a payment with split configuration
     */
    async createPaymentWithSplit(data: PaymentData & { split: Split[] }): Promise<Payment> {
        return this.http.post<Payment>('/payments', data);
    }

    /**
     * Update the split configuration of an existing payment.
     * Warning: Omitting the split field on a regular update will remove existing splits.
     */
    async updatePaymentSplit(paymentId: string, splits: Split[]): Promise<Payment> {
        return this.http.put<Payment>(`/payments/${paymentId}`, { split: splits });
    }

    /**
     * Remove all splits from a payment
     */
    async removePaymentSplit(paymentId: string): Promise<Payment> {
        return this.http.put<Payment>(`/payments/${paymentId}`, { split: [] });
    }

    /**
     * Get split information for a specific payment
     */
    async getPaymentSplits(paymentId: string): Promise<Split[]> {
        const payment = await this.http.get<Payment>(`/payments/${paymentId}`);
        return payment.split ?? [];
    }

    /**
     * Validate split configuration totals.
     * Returns an object indicating whether the configuration is valid.
     */
    validateSplitConfig(splits: Split[], paymentValue?: number): { valid: boolean; message?: string } {
        if (splits.length === 0) {
            return { valid: false, message: 'At least one split entry is required' };
        }

        const hasPercentual = splits.some(s => s.percentualValue !== undefined);
        const hasFixed = splits.some(s => s.fixedValue !== undefined);

        if (hasPercentual && hasFixed) {
            return { valid: false, message: 'Cannot mix percentual and fixed values in splits' };
        }

        if (hasPercentual) {
            const total = splits.reduce((sum, s) => sum + (s.percentualValue ?? 0), 0);
            if (total > 100) {
                return { valid: false, message: `Split percentages sum to ${total}%, exceeds 100%` };
            }
        }

        if (hasFixed && paymentValue !== undefined) {
            const total = splits.reduce((sum, s) => sum + (s.fixedValue ?? 0), 0);
            if (total > paymentValue) {
                return { valid: false, message: `Split fixed values sum to ${total}, exceeds payment value of ${paymentValue}` };
            }
        }

        for (const split of splits) {
            if (!split.walletId) {
                return { valid: false, message: 'All splits must have a walletId' };
            }
        }

        return { valid: true };
    }
}
