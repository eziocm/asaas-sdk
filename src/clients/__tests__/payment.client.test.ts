import { PaymentClient } from '../payment.client';
import { AsaasHttpClient } from '../../utils/http-client';
import { PaymentData, PaymentListParams } from '../../types';

// Mock AsaasHttpClient
jest.mock('../../utils/http-client');

describe('PaymentClient', () => {
    let paymentClient: PaymentClient;
    let mockHttpClient: jest.Mocked<AsaasHttpClient>;

    beforeEach(() => {
        // Clear all mocks
        jest.clearAllMocks();

        // Create a mock instance of AsaasHttpClient
        mockHttpClient = new AsaasHttpClient({ apiKey: 'test-key' }) as jest.Mocked<AsaasHttpClient>;

        // Manually mock the methods we use
        mockHttpClient.get = jest.fn();
        mockHttpClient.post = jest.fn();
        mockHttpClient.put = jest.fn();
        mockHttpClient.delete = jest.fn();

        paymentClient = new PaymentClient(mockHttpClient);
    });

    describe('create', () => {
        it('should call http.post with correct endpoint and data', async () => {
            const paymentData: PaymentData = {
                customer: 'cus_123',
                billingType: 'BOLETO',
                value: 100,
                dueDate: '2023-12-31',
            };

            const mockResponse = { id: 'pay_123', ...paymentData };
            (mockHttpClient.post as jest.Mock).mockResolvedValue(mockResponse);

            const result = await paymentClient.create(paymentData);

            expect(mockHttpClient.post).toHaveBeenCalledWith('/payments', paymentData);
            expect(result).toEqual(mockResponse);
        });
    });

    describe('list', () => {
        it('should call http.get with correct endpoint and query params', async () => {
            const params: PaymentListParams = {
                customer: 'cus_123',
                status: 'PENDING',
                offset: 0,
                limit: 10,
            };

            const mockResponse = {
                object: 'list',
                hasMore: false,
                totalCount: 1,
                limit: 10,
                offset: 0,
                data: [{ id: 'pay_123' }],
            };

            (mockHttpClient.get as jest.Mock).mockResolvedValue(mockResponse);

            const result = await paymentClient.list(params);

            expect(mockHttpClient.get).toHaveBeenCalledWith('/payments', {
                customer: 'cus_123',
                status: 'PENDING',
                offset: '0',
                limit: '10',
            });
            expect(result).toEqual(mockResponse);
        });

        it('should handle date range filters correctly', async () => {
            const params: PaymentListParams = {
                paymentDate: {
                    ge: '2023-01-01',
                    le: '2023-01-31'
                }
            };

            await paymentClient.list(params);

            expect(mockHttpClient.get).toHaveBeenCalledWith('/payments', {
                'paymentDate[ge]': '2023-01-01',
                'paymentDate[le]': '2023-01-31'
            });
        });
    });

    describe('get', () => {
        it('should call http.get with correct endpoint', async () => {
            const paymentId = 'pay_123';
            const mockResponse = { id: paymentId, value: 100 };
            (mockHttpClient.get as jest.Mock).mockResolvedValue(mockResponse);

            const result = await paymentClient.get(paymentId);

            expect(mockHttpClient.get).toHaveBeenCalledWith(`/payments/${paymentId}`);
            expect(result).toEqual(mockResponse);
        });
    });

    describe('update', () => {
        it('should call http.put with correct endpoint and data', async () => {
            const paymentId = 'pay_123';
            const updateData = { value: 200 };
            const mockResponse = { id: paymentId, value: 200 };
            (mockHttpClient.put as jest.Mock).mockResolvedValue(mockResponse);

            const result = await paymentClient.update(paymentId, updateData);

            expect(mockHttpClient.put).toHaveBeenCalledWith(`/payments/${paymentId}`, updateData);
            expect(result).toEqual(mockResponse);
        });
    });

    describe('delete', () => {
        it('should call http.delete with correct endpoint', async () => {
            const paymentId = 'pay_123';
            const mockResponse = { deleted: true, id: paymentId };
            (mockHttpClient.delete as jest.Mock).mockResolvedValue(mockResponse);

            const result = await paymentClient.delete(paymentId);

            expect(mockHttpClient.delete).toHaveBeenCalledWith(`/payments/${paymentId}`);
            expect(result).toEqual(mockResponse);
        });
    });

    describe('restore', () => {
        it('should call http.post with correct endpoint', async () => {
            const paymentId = 'pay_123';
            await paymentClient.restore(paymentId);
            expect(mockHttpClient.post).toHaveBeenCalledWith(`/payments/${paymentId}/restore`);
        });
    });

    describe('getPixQrCode', () => {
        it('should call http.get with correct endpoint', async () => {
            const paymentId = 'pay_123';
            await paymentClient.getPixQrCode(paymentId);
            expect(mockHttpClient.get).toHaveBeenCalledWith(`/payments/${paymentId}/pixQrCode`);
        });
    });

    describe('receiveInCash', () => {
        it('should call http.post with correct endpoint and data', async () => {
            const paymentId = 'pay_123';
            const data = { paymentDate: '2023-01-01', value: 100 };
            await paymentClient.receiveInCash(paymentId, data);
            expect(mockHttpClient.post).toHaveBeenCalledWith(`/payments/${paymentId}/receiveInCash`, data);
        });
    });

    describe('getStatus', () => {
        it('should call http.get with correct endpoint', async () => {
            const paymentId = 'pay_123';
            const mockResponse = { status: 'RECEIVED' };
            (mockHttpClient.get as jest.Mock).mockResolvedValue(mockResponse);

            const result = await paymentClient.getStatus(paymentId);

            expect(mockHttpClient.get).toHaveBeenCalledWith(`/payments/${paymentId}/status`);
            expect(result).toEqual(mockResponse);
        });
    });

    describe('getIdentificationField', () => {
        it('should call http.get with correct endpoint', async () => {
            const paymentId = 'pay_123';
            const mockResponse = { identificationField: '12345' };
            (mockHttpClient.get as jest.Mock).mockResolvedValue(mockResponse);

            const result = await paymentClient.getIdentificationField(paymentId);

            expect(mockHttpClient.get).toHaveBeenCalledWith(`/payments/${paymentId}/identificationField`);
            expect(result).toEqual(mockResponse);
        });
    });

    describe('undoReceivedInCash', () => {
        it('should call http.post with correct endpoint', async () => {
            const paymentId = 'pay_123';
            const mockResponse = { id: paymentId, status: 'PENDING' };
            (mockHttpClient.post as jest.Mock).mockResolvedValue(mockResponse);

            const result = await paymentClient.undoReceivedInCash(paymentId);

            expect(mockHttpClient.post).toHaveBeenCalledWith(`/payments/${paymentId}/undoReceivedInCash`);
            expect(result).toEqual(mockResponse);
        });
    });

    describe('getBillingInfo', () => {
        it('should call http.get with correct endpoint', async () => {
            const paymentId = 'pay_123';
            (mockHttpClient.get as jest.Mock).mockResolvedValue({});

            await paymentClient.getBillingInfo(paymentId);

            expect(mockHttpClient.get).toHaveBeenCalledWith(`/payments/${paymentId}/billingInfo`);
        });
    });

    describe('getViewingInfo', () => {
        it('should call http.get with correct endpoint', async () => {
            const paymentId = 'pay_123';
            (mockHttpClient.get as jest.Mock).mockResolvedValue({});

            await paymentClient.getViewingInfo(paymentId);

            expect(mockHttpClient.get).toHaveBeenCalledWith(`/payments/${paymentId}/viewingInfo`);
        });
    });
});
