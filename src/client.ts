import { IntegrationConfig } from './config';
import { request } from 'gaxios';
import {
  DigitalOceanAccount,
  DigitalOceanAccountResponse,
} from './types/accountType';
import {
  IntegrationProviderAPIError,
  IntegrationProviderAuthenticationError,
  IntegrationProviderAuthorizationError,
} from '@jupiterone/integration-sdk-core';
import { DataKey, PaginatedResponse } from './types/paginatedResponse';
import { DigitalOceanDroplet } from './types/dropletType';

export type ResourceIteratee<T> = (each: T) => Promise<void> | void;

type IterateResourcesParams = {
  url: string;
  dataKey: DataKey;
};

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

  async iterateResources<T>(
    { url, dataKey }: IterateResourcesParams,
    iteratee: ResourceIteratee<T>,
  ): Promise<void> {
    let next: string | undefined = this.BASE_URL + url;

    do {
      const response = await request<PaginatedResponse<typeof dataKey, T>>({
        url: next,
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      const data = response.data[dataKey];
      for (const datum of data) {
        await iteratee(datum);
      }
      next = response.data.links?.pages?.next;
    } while (next);
  }

  async iterateDroplets(iteratee: ResourceIteratee<DigitalOceanDroplet>) {
    const url = '/v2/droplets';

    await this.iterateResources<DigitalOceanDroplet>(
      {
        url,
        dataKey: 'droplets',
      },
      iteratee,
    );
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
      throw this.createIntegrationError(
        err.response.status,
        err.response.statusText,
        this.BASE_URL + url,
      );
    }
  }

  //async iterateDroplets

  private createIntegrationError(
    status: number,
    statusText: string,
    endpoint: string,
  ) {
    switch (status) {
      case 401:
        return new IntegrationProviderAuthenticationError({
          status,
          statusText,
          endpoint,
        });
      case 403:
        return new IntegrationProviderAuthorizationError({
          status,
          statusText,
          endpoint,
        });
      default:
        return new IntegrationProviderAPIError({
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
