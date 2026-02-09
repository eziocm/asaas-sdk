export interface CreditBureauReport {
    id: string;
    customer?: string;
    cpfCnpj?: string;
    state?: 'SP' | 'RJ' | 'MG' | 'RS' | 'PR' | 'SC' | 'GO' | 'DF' | 'BA' | 'PE' | 'CE' | 'PA' | 'MA' | 'MT' | 'ES' | 'PB' | 'AM' | 'RN' | 'AL' | 'PI' | 'MS' | 'RO' | 'SE' | 'TO' | 'AP' | 'AC' | 'RR';
    status: 'PENDING' | 'PROCESSED' | 'FAILED' | 'CANCELLED';
    reportUrl?: string; // URL do relatório (geralmente .html ou .pdf)
    externalReference?: string;
    createdDate: string;
}

export interface CreateCreditBureauReport {
    customer?: string;
    cpfCnpj?: string;
    state?: 'SP' | 'RJ' | 'MG' | 'RS' | 'PR' | 'SC' | 'GO' | 'DF' | 'BA' | 'PE' | 'CE' | 'PA' | 'MA' | 'MT' | 'ES' | 'PB' | 'AM' | 'RN' | 'AL' | 'PI' | 'MS' | 'RO' | 'SE' | 'TO' | 'AP' | 'AC' | 'RR';
    externalReference?: string;
}

export interface ListCreditBureauReportParams {
    status?: string;
    startDate?: string;
    endDate?: string;
    offset?: number;
    limit?: number;
}
