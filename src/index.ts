/**
 * Main Asaas SDK Client
 */

import { AsaasHttpClient } from './utils/http-client';
import { CustomerClient } from './clients/customer.client';
import { PaymentClient } from './clients/payment.client';
import { SubscriptionClient } from './clients/subscription.client';
import { PixClient } from './clients/pix.client';
import { WebhookClient } from './clients/webhook.client';
import { InstallmentClient } from './clients/installment.client';
import { TransferClient } from './clients/transfer.client';
import { RefundClient } from './clients/refund.client';
import { AnticipationClient } from './clients/anticipation.client';
import { AccountClient } from './clients/account.client';
import { SubaccountClient } from './clients/subaccount.client';
import { CreditCardClient } from './clients/creditcard.client';
import { NotificationClient } from './clients/notification.client';
import { AsaasConfig } from './types';

export class AsaasSDK {
    private http: AsaasHttpClient;

    public readonly customers: CustomerClient;
    public readonly payments: PaymentClient;
    public readonly subscriptions: SubscriptionClient;
    public readonly pix: PixClient;
    public readonly webhooks: WebhookClient;
    public readonly installments: InstallmentClient;
    public readonly transfers: TransferClient;
    public readonly refunds: RefundClient;
    public readonly anticipations: AnticipationClient;
    public readonly account: AccountClient;
    public readonly subaccounts: SubaccountClient;
    public readonly creditCard: CreditCardClient;
    public readonly notifications: NotificationClient;

    constructor(config: AsaasConfig) {
        this.http = new AsaasHttpClient(config);

        // Initialize all clients
        this.customers = new CustomerClient(this.http);
        this.payments = new PaymentClient(this.http);
        this.subscriptions = new SubscriptionClient(this.http);
        this.pix = new PixClient(this.http);
        this.webhooks = new WebhookClient(this.http);
        this.installments = new InstallmentClient(this.http);
        this.transfers = new TransferClient(this.http);
        this.refunds = new RefundClient(this.http);
        this.anticipations = new AnticipationClient(this.http);
        this.account = new AccountClient(this.http);
        this.subaccounts = new SubaccountClient(this.http);
        this.creditCard = new CreditCardClient(this.http);
        this.notifications = new NotificationClient(this.http);
    }

    /**
     * Get the underlying HTTP client for custom requests
     */
    getHttpClient(): AsaasHttpClient {
        return this.http;
    }
}

// Export everything
export * from './types';
export { AsaasHttpClient, AsaasApiError } from './utils/http-client';
export { CustomerClient } from './clients/customer.client';
export { PaymentClient } from './clients/payment.client';
export { SubscriptionClient } from './clients/subscription.client';
export { PixClient } from './clients/pix.client';
export { WebhookClient } from './clients/webhook.client';
export { InstallmentClient } from './clients/installment.client';
export { TransferClient } from './clients/transfer.client';
export { RefundClient } from './clients/refund.client';
export { AnticipationClient } from './clients/anticipation.client';
export { AccountClient } from './clients/account.client';
export { SubaccountClient } from './clients/subaccount.client';
export { CreditCardClient } from './clients/creditcard.client';
export { NotificationClient } from './clients/notification.client';
