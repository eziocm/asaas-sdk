/**
 * Credit Card Client - Handles credit card tokenization
 */

import { AsaasHttpClient } from '../utils/http-client';

export interface CreditCardTokenizeData {
    creditCard: {
        holderName: string;
        number: string;
        expiryMonth: string;
        expiryYear: string;
        ccv: string;
    };
    creditCardHolderInfo: {
        name: string;
        email: string;
        cpfCnpj: string;
        postalCode: string;
        addressNumber: string;
        phone?: string;
    };
    customer: string;
}

export interface CreditCardToken {
    creditCardToken: string;
}

export class CreditCardClient {
    constructor(private http: AsaasHttpClient) { }

    /**
     * Tokenize a credit card
     */
    async tokenize(data: CreditCardTokenizeData): Promise<CreditCardToken> {
        return this.http.post<CreditCardToken>('/creditCard/tokenize', data);
    }
}
