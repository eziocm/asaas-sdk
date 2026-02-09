import { AsaasHttpClient, AsaasApiError } from '../http-client';
import { AsaasConfig } from '../../types';

// Mock global fetch
global.fetch = jest.fn();

describe('AsaasHttpClient', () => {
    const mockConfig: AsaasConfig = {
        apiKey: 'test-api-key',
        environment: 'sandbox',
    };

    let client: AsaasHttpClient;

    beforeEach(() => {
        jest.clearAllMocks();
        client = new AsaasHttpClient(mockConfig);
    });

    describe('Constructor', () => {
        it('should set the base URL correctly for sandbox environment', () => {
            // Accessing private property for testing purposes only
            expect((client as any).baseUrl).toBe('https://sandbox.asaas.com/api/v3');
        });

        it('should set the base URL correctly for production environment', () => {
            const prodClient = new AsaasHttpClient({ ...mockConfig, environment: 'production' });
            expect((prodClient as any).baseUrl).toBe('https://api.asaas.com/v3');
        });

        it('should set the base URL correctly when provided explicitly', () => {
            const customClient = new AsaasHttpClient({
                ...mockConfig,
                baseUrl: 'https://custom.api.com',
            });
            expect((customClient as any).baseUrl).toBe('https://custom.api.com');
        });
    });

    describe('Request Methods', () => {
        const mockResponse = { id: '123', status: 'success' };

        beforeEach(() => {
            (global.fetch as jest.Mock).mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(mockResponse),
            });
        });

        describe('get', () => {
            it('should make a GET request with correct headers', async () => {
                await client.get('/test-endpoint');

                expect(global.fetch).toHaveBeenCalledWith(
                    'https://sandbox.asaas.com/api/v3/test-endpoint',
                    expect.objectContaining({
                        method: 'GET',
                        headers: expect.objectContaining({
                            'Content-Type': 'application/json',
                            'access_token': 'test-api-key',
                        }),
                    })
                );
            });

            it('should include query parameters in the URL', async () => {
                await client.get('/test-endpoint', { page: '1', limit: '10' });

                expect(global.fetch).toHaveBeenCalledWith(
                    'https://sandbox.asaas.com/api/v3/test-endpoint?page=1&limit=10',
                    expect.anything()
                );
            });
        });

        describe('post', () => {
            it('should make a POST request with body', async () => {
                const body = { name: 'Test' };
                await client.post('/test-endpoint', body);

                expect(global.fetch).toHaveBeenCalledWith(
                    'https://sandbox.asaas.com/api/v3/test-endpoint',
                    expect.objectContaining({
                        method: 'POST',
                        body: JSON.stringify(body),
                    })
                );
            });
        });

        describe('put', () => {
            it('should make a PUT request with body', async () => {
                const body = { name: 'Updated' };
                await client.put('/test-endpoint', body);

                expect(global.fetch).toHaveBeenCalledWith(
                    'https://sandbox.asaas.com/api/v3/test-endpoint',
                    expect.objectContaining({
                        method: 'PUT',
                        body: JSON.stringify(body),
                    })
                );
            });
        });

        describe('delete', () => {
            it('should make a DELETE request', async () => {
                await client.delete('/test-endpoint');

                expect(global.fetch).toHaveBeenCalledWith(
                    'https://sandbox.asaas.com/api/v3/test-endpoint',
                    expect.objectContaining({
                        method: 'DELETE',
                    })
                );
            });
        });
    });

    describe('Error Handling', () => {
        it('should throw AsaasApiError on non-200 response', async () => {
            const errorResponse = {
                errors: [{ code: 'INVALID_API_KEY', description: 'Invalid API Key' }],
            };

            (global.fetch as jest.Mock).mockResolvedValue({
                ok: false,
                status: 401,
                statusText: 'Unauthorized',
                json: jest.fn().mockResolvedValue(errorResponse),
            });

            await expect(client.get('/test-endpoint')).rejects.toThrow(AsaasApiError);

            try {
                await client.get('/test-endpoint');
            } catch (error: any) {
                expect(error).toBeInstanceOf(AsaasApiError);
                expect(error.statusCode).toBe(401);
                expect(error.asaasError).toEqual(errorResponse);
            }
        });

        it('should handle network errors', async () => {
            (global.fetch as jest.Mock).mockRejectedValue(new Error('Network Error'));

            await expect(client.get('/test-endpoint')).rejects.toThrow('Network error: Network Error');
        });

        it('should handle JSON parse errors from server', async () => {
            (global.fetch as jest.Mock).mockResolvedValue({
                ok: false,
                status: 500,
                statusText: 'Internal Server Error',
                json: jest.fn().mockRejectedValue(new Error('Invalid JSON')),
            });

            try {
                await client.get('/test-endpoint');
            } catch (error: any) {
                expect(error).toBeInstanceOf(AsaasApiError);
                // The code defaults to creating a generic error when json parsing fails
                expect(error.asaasError.errors[0].code).toBe('HTTP_500');
            }
        });
    });
});
