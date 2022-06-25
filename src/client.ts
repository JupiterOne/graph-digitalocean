import { IntegrationConfig } from './config';
import { request } from 'gaxios';
import { DigitalOceanAccount, DigitalOceanAccountResponse } from './types';
import {
  IntegrationProviderAPIError,
  IntegrationProviderAuthenticationError,
  IntegrationProviderAuthorizationError,
} from '@jupiterone/integration-sdk-core';

export type ResourceIteratee<T> = (each: T) => Promise<void> | void;

/**
 * An APIClient maintains authentication state and provides an interface to
 * third party data APIs.
 *
 * It is recommended that integrations wrap provider data APIs to provide a
 * place to handle error responses and implement common patterns for iterating
 * resources.
 */
export class APIClient {
  private BASE_URL: string;
  private accessToken: string;
  constructor(readonly config: IntegrationConfig) {
    this.BASE_URL = 'https://api.digitalocean.com';
    this.accessToken = config.accessToken;
  }

  async getAccount(): Promise<DigitalOceanAccount> {
    const url = '/v2/account';
    try {
      const response = await request<DigitalOceanAccountResponse>({
        baseURL: this.BASE_URL,
        url,
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
      return response.data.account;
    } catch (err) {
      this.throwIntegrationError(
        err.response.status,
        err.response.statusText,
        this.BASE_URL + url,
      );
    }
  }

  private throwIntegrationError(
    status: number,
    statusText: string,
    endpoint: string,
  ) {
    switch (status) {
      case 401:
        throw new IntegrationProviderAuthenticationError({
          status,
          statusText,
          endpoint,
        });
      case 403:
        throw new IntegrationProviderAuthorizationError({
          status,
          statusText,
          endpoint,
        });
      default:
        throw new IntegrationProviderAPIError({
          status,
          statusText,
          endpoint,
        });
    }
  }
}

export function createAPIClient(config: IntegrationConfig): APIClient {
  return new APIClient(config);
}
