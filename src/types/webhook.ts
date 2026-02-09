/**
 * Webhook-related types
 */

export interface WebhookData {
    name: string;
    url: string;
    email?: string;
    apiVersion?: number;
    enabled?: boolean;
    interrupted?: boolean;
    authToken?: string;
    events: string[];
}

export interface Webhook extends WebhookData {
    id: string;
}

export interface WebhookUpdateData {
    name?: string;
    url?: string;
    email?: string;
    enabled?: boolean;
    interrupted?: boolean;
    authToken?: string;
    events?: string[];
}

export interface WebhookPayload<T = any> {
    event: string;
    payment?: T;
    transfer?: T;
    bill?: T;
    [key: string]: any;
}
