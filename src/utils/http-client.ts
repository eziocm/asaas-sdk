/**
 * HTTP Client utility for making requests to Asaas API
 */

import { AsaasConfig, AsaasError } from '../types';

export class AsaasHttpClient {
    private baseUrl: string;
    private apiKey: string;

    constructor(config: AsaasConfig) {
        this.apiKey = config.apiKey;

        if (config.baseUrl) {
            this.baseUrl = config.baseUrl;
        } else {
            const env = config.environment || 'production';
            this.baseUrl = env === 'production'
                ? 'https://api.asaas.com/v3'
                : 'https://sandbox.asaas.com/api/v3';
        }
    }

    private getHeaders(): HeadersInit {
        return {
            'Content-Type': 'application/json',
            'access_token': this.apiKey,
        };
    }

    private buildUrl(endpoint: string, query?: Record<string, string>): string {
        let url = `${this.baseUrl}${endpoint}`;

        if (query) {
            const queryString = new URLSearchParams(query).toString();
            if (queryString) {
                url += `?${queryString}`;
            }
        }

        return url;
    }

    async request<T>(
        endpoint: string,
        method: string,
        body?: any,
        query?: Record<string, string>
    ): Promise<T> {
        const url = this.buildUrl(endpoint, query);

        const options: RequestInit = {
            method,
            headers: this.getHeaders(),
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                const error: AsaasError = await response.json().catch(() => ({
                    errors: [
                        {
                            code: `HTTP_${response.status}`,
                            description: response.statusText,
                        },
                    ],
                }));

                throw new AsaasApiError(
                    `Asaas API Error: ${response.status} ${response.statusText}`,
                    response.status,
                    error
                );
            }

            return response.json();
        } catch (error) {
            if (error instanceof AsaasApiError) {
                throw error;
            }

            throw new AsaasApiError(
                `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`,
                0,
                {
                    errors: [
                        {
                            code: 'NETWORK_ERROR',
                            description: error instanceof Error ? error.message : 'Unknown error',
                        },
                    ],
                }
            );
        }
    }

    async get<T>(endpoint: string, query?: Record<string, string>): Promise<T> {
        return this.request<T>(endpoint, 'GET', undefined, query);
    }

    async post<T>(endpoint: string, body?: any, query?: Record<string, string>): Promise<T> {
        return this.request<T>(endpoint, 'POST', body, query);
    }

    async put<T>(endpoint: string, body?: any, query?: Record<string, string>): Promise<T> {
        return this.request<T>(endpoint, 'PUT', body, query);
    }

    async delete<T>(endpoint: string, query?: Record<string, string>): Promise<T> {
        return this.request<T>(endpoint, 'DELETE', undefined, query);
    }
}

export class AsaasApiError extends Error {
    constructor(
        message: string,
        public statusCode: number,
        public asaasError: AsaasError
    ) {
        super(message);
        this.name = 'AsaasApiError';
        Object.setPrototypeOf(this, AsaasApiError.prototype);
    }
}
