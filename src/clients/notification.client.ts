/**
 * Notification Client - Handles notification-related operations
 */

import { AsaasHttpClient } from '../utils/http-client';

export interface NotificationUpdateData {
    enabled?: boolean;
    emailEnabledForProvider?: boolean;
    smsEnabledForProvider?: boolean;
    emailEnabledForCustomer?: boolean;
    smsEnabledForCustomer?: boolean;
    phoneCallEnabledForCustomer?: boolean;
    whatsappEnabledForCustomer?: boolean;
}

export interface NotificationBatchUpdateData {
    notifications: Array<{
        id: string;
        enabled?: boolean;
        emailEnabledForProvider?: boolean;
        smsEnabledForProvider?: boolean;
    }>;
}

export class NotificationClient {
    constructor(private http: AsaasHttpClient) { }

    /**
     * Update a notification
     */
    async update(id: string, data: NotificationUpdateData): Promise<any> {
        return this.http.put(`/notifications/${id}`, data);
    }

    /**
     * Update notifications in batch
     */
    async updateBatch(data: NotificationBatchUpdateData): Promise<any> {
        return this.http.put('/notifications/batch', data);
    }
}
