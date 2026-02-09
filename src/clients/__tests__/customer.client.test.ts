import { CustomerClient } from '../customer.client';
import { AsaasHttpClient } from '../../utils/http-client';
import { CustomerData, CustomerListParams } from '../../types';

jest.mock('../../utils/http-client');

describe('CustomerClient', () => {
    let customerClient: CustomerClient;
    let mockHttpClient: jest.Mocked<AsaasHttpClient>;

    beforeEach(() => {
        jest.clearAllMocks();
        mockHttpClient = new AsaasHttpClient({ apiKey: 'test-key' }) as jest.Mocked<AsaasHttpClient>;

        mockHttpClient.get = jest.fn();
        mockHttpClient.post = jest.fn();
        mockHttpClient.put = jest.fn();
        mockHttpClient.delete = jest.fn();

        customerClient = new CustomerClient(mockHttpClient);
    });

    describe('create', () => {
        it('should call http.post with correct endpoint and data', async () => {
            const customerData: CustomerData = {
                name: 'John Doe',
                cpfCnpj: '12345678900',
                email: 'john@example.com',
            };

            const mockResponse = { id: 'cus_123', ...customerData };
            (mockHttpClient.post as jest.Mock).mockResolvedValue(mockResponse);

            const result = await customerClient.create(customerData);

            expect(mockHttpClient.post).toHaveBeenCalledWith('/customers', customerData);
            expect(result).toEqual(mockResponse);
        });
    });

    describe('list', () => {
        it('should call http.get with correct endpoint and query params', async () => {
            const params: CustomerListParams = {
                name: 'John',
                offset: 0,
                limit: 10,
            };

            const mockResponse = {
                object: 'list',
                hasMore: false,
                totalCount: 1,
                limit: 10,
                offset: 0,
                data: [{ id: 'cus_123' }],
            };

            (mockHttpClient.get as jest.Mock).mockResolvedValue(mockResponse);

            const result = await customerClient.list(params);

            // Verify that the query params are correctly mapped
            expect(mockHttpClient.get).toHaveBeenCalledWith('/customers', {
                name: 'John',
                offset: '0',
                limit: '10',
            });
            expect(result).toEqual(mockResponse);
        });

        it('should handle all filters correctly', async () => {
            const params: CustomerListParams = {
                name: 'John',
                email: 'john@example.com',
                cpfCnpj: '12345678900'
            };

            await customerClient.list(params);

            expect(mockHttpClient.get).toHaveBeenCalledWith('/customers', {
                name: 'John',
                email: 'john@example.com',
                cpfCnpj: '12345678900'
            });
        });
    });

    describe('get', () => {
        it('should call http.get with correct endpoint', async () => {
            const customerId = 'cus_123';
            const mockResponse = { id: customerId, name: 'John Doe' };
            (mockHttpClient.get as jest.Mock).mockResolvedValue(mockResponse);

            const result = await customerClient.get(customerId);

            expect(mockHttpClient.get).toHaveBeenCalledWith(`/customers/${customerId}`);
            expect(result).toEqual(mockResponse);
        });
    });

    describe('update', () => {
        it('should call http.put with correct endpoint and data', async () => {
            const customerId = 'cus_123';
            const updateData = { name: 'Jane Doe' };
            const mockResponse = { id: customerId, ...updateData };
            (mockHttpClient.put as jest.Mock).mockResolvedValue(mockResponse);

            const result = await customerClient.update(customerId, updateData);

            expect(mockHttpClient.put).toHaveBeenCalledWith(`/customers/${customerId}`, updateData);
            expect(result).toEqual(mockResponse);
        });
    });

    describe('delete', () => {
        it('should call http.delete with correct endpoint', async () => {
            const customerId = 'cus_123';
            const mockResponse = { deleted: true, id: customerId };
            (mockHttpClient.delete as jest.Mock).mockResolvedValue(mockResponse);

            await customerClient.delete(customerId);

            expect(mockHttpClient.delete).toHaveBeenCalledWith(`/customers/${customerId}`);
        });
    });

    describe('restore', () => {
        it('should call http.post with correct endpoint', async () => {
            const customerId = 'cus_123';
            await customerClient.restore(customerId);
            expect(mockHttpClient.post).toHaveBeenCalledWith(`/customers/${customerId}/restore`);
        });
    });
});
