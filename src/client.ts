import { IntegrationConfig } from './config';
import { GaxiosError, request } from 'gaxios';
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
import {
  DigitalOceanDroplet,
  DigitalOceanDropletSnapshot,
} from './types/dropletType';
import {
  DigitalOceanProject,
  DigitalOceanProjectResources,
} from './types/projectType';
import { DigitalOceanVolume } from './types/volumeType';
import {
  DigitalOceanDomain,
  DigitalOceanDomainRecord,
} from './types/domainType';
import { DigitalOceanReservedIP } from './types/ipType';
import { DigitalOceanSSHKey } from './types/sshKeyType';
import {
  DigitalOceanDatabase,
  DigitalOceanDatabaseBackup,
  DigitalOceanDatabaseCertificate,
  DigitalOceanDatabaseCertificateResponse,
} from './types/databaseType';
import { DigitalOceanSnapshot } from './types/snapshotType';
import { DigitalOceanFirewall } from './types/firewallType';
import { DigitalOceanAlertPolicy } from './types/alertPolicy';
import { DigitalOceanCertificate } from './types/certificateType';
import { DigitalOceanContainerRegistry } from './types/registryType';

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

  private async iterateResources<T>(
    { url, dataKey }: IterateResourcesParams,
    iteratee: ResourceIteratee<T>,
  ): Promise<void> {
    let next: string | undefined = this.BASE_URL + url;

    do {
      try {
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
      } catch (err) {
        if (err instanceof GaxiosError) {
          throw this.createIntegrationError(
            err.response?.status as number,
            err.response?.statusText as string,
            next as string,
          );
        } else {
          throw err;
        }
      }
    } while (next);
  }

  async iterateContainerRegistries(
    iteratee: ResourceIteratee<DigitalOceanContainerRegistry>,
  ) {
    await this.iterateResources(
      {
        url: '/v2/registry',
        dataKey: 'registry',
      },
      iteratee,
    );
  }

  async iterateCertificates(
    iteratee: ResourceIteratee<DigitalOceanCertificate>,
  ) {
    await this.iterateResources<DigitalOceanCertificate>(
      {
        url: '/v2/certificates',
        dataKey: 'certificates',
      },
      iteratee,
    );
  }

  async iterateAlertPolicies(
    iteratee: ResourceIteratee<DigitalOceanAlertPolicy>,
  ) {
    await this.iterateResources<DigitalOceanAlertPolicy>(
      {
        url: '/v2/monitoring/alerts',
        dataKey: 'policies',
      },
      iteratee,
    );
  }

  async iterateFirewalls(iteratee: ResourceIteratee<DigitalOceanFirewall>) {
    await this.iterateResources<DigitalOceanFirewall>(
      {
        url: '/v2/firewalls',
        dataKey: 'firewalls',
      },
      iteratee,
    );
  }

  async iterateSnapshots(iteratee: ResourceIteratee<DigitalOceanSnapshot>) {
    await this.iterateResources<DigitalOceanSnapshot>(
      { url: '/v2/snapshots', dataKey: 'snapshots' },
      iteratee,
    );
  }

  async iterateDatabaseBackups(
    uuid: string,
    iteratee: ResourceIteratee<DigitalOceanDatabaseBackup>,
  ) {
    await this.iterateResources<DigitalOceanDatabaseBackup>(
      {
        url: `/v2/databases/${uuid}/backups`,
        dataKey: 'backups',
      },
      iteratee,
    );
  }

  async iterateDatabases(iteratee: ResourceIteratee<DigitalOceanDatabase>) {
    await this.iterateResources<DigitalOceanDatabase>(
      {
        url: '/v2/databases',
        dataKey: 'databases',
      },
      iteratee,
    );
  }

  async iterateProjectResources(
    projectId: string,
    iteratee: ResourceIteratee<DigitalOceanProjectResources>,
  ): Promise<void> {
    await this.iterateResources<DigitalOceanProjectResources>(
      {
        url: `/v2/projects/${projectId}/resources`,
        dataKey: 'resources',
      },
      iteratee,
    );
  }
  async iterateSSHKeys(iteratee: ResourceIteratee<DigitalOceanSSHKey>) {
    await this.iterateResources<DigitalOceanSSHKey>(
      {
        url: '/v2/account/keys',
        dataKey: 'ssh_keys',
      },
      iteratee,
    );
  }

  async iterateReservedIps(iteratee: ResourceIteratee<DigitalOceanReservedIP>) {
    await this.iterateResources<DigitalOceanReservedIP>(
      {
        url: '/v2/reserved_ips',
        dataKey: 'reserved_ips',
      },
      iteratee,
    );
  }

  async iterateDomainRecords(
    domainName: string,
    iteratee: ResourceIteratee<DigitalOceanDomainRecord>,
  ) {
    await this.iterateResources<DigitalOceanDomainRecord>(
      {
        url: `/v2/${domainName}/records`,
        dataKey: 'domain_records',
      },
      iteratee,
    );
  }

  async iterateDomains(iteratee: ResourceIteratee<DigitalOceanDomain>) {
    await this.iterateResources<DigitalOceanDomain>(
      {
        url: '/v2/domains',
        dataKey: 'domains',
      },
      iteratee,
    );
  }

  async iterateVolumes(iteratee: ResourceIteratee<DigitalOceanVolume>) {
    await this.iterateResources<DigitalOceanVolume>(
      {
        url: '/v2/volumes',
        dataKey: 'volumes',
      },
      iteratee,
    );
  }

  async iterateProjects(iteratee: ResourceIteratee<DigitalOceanProject>) {
    await this.iterateResources<DigitalOceanProject>(
      {
        url: '/v2/projects',
        dataKey: 'projects',
      },
      iteratee,
    );
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

  async iterateDropletSnapshots(
    dropletId: string | number,
    iteratee: ResourceIteratee<DigitalOceanDropletSnapshot>,
  ) {
    const url = `/v2/droplets/${dropletId}/snapshots`;
    await this.iterateResources<DigitalOceanDropletSnapshot>(
      {
        url,
        dataKey: 'snapshots',
      },
      iteratee,
    );
  }

  async getDatabaseCA(uuid: string): Promise<DigitalOceanDatabaseCertificate> {
    const url = `/v2/databases/${uuid}/certificates`;
    try {
      const response = await request<DigitalOceanDatabaseCertificateResponse>({
        baseURL: this.BASE_URL,
        url,
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
      return response.data.ca;
    } catch (err) {
      if (err instanceof GaxiosError) {
        throw this.createIntegrationError(
          err.response?.status as number,
          err.response?.statusText as string,
          this.BASE_URL + url,
        );
      } else {
        throw err;
      }
    }
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
      if (err instanceof GaxiosError) {
        throw this.createIntegrationError(
          err.response?.status as number,
          err.response?.statusText as string,
          this.BASE_URL + url,
        );
      } else {
        throw err;
      }
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
