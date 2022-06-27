import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { Entities, Steps } from '../constants';
import { createDomainEntity, createDomainRecordEntity } from './converter';

export const domainSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.DOMAINS,
    name: 'Fetch Domains',
    entities: [Entities.DOMAIN],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchDroplets,
  },
  {
    id: Steps.DOMAIN_RECORDS,
    name: 'Fetch Domain Records',
    entities: [Entities.DOMAIN_RECORD],
    relationships: [],
    dependsOn: [Steps.DOMAINS],
    executionHandler: fetchDomainsRecords,
  },
];

// TODO: Would it be better to have domain as the target of an mapped
// relationship since the domain itself might exist elsewhere in the graph
export async function fetchDroplets({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const client = createAPIClient(instance.config);
  await client.iterateDomains(async (domain) => {
    await jobState.addEntity(createDomainEntity(domain));
  });
}

export async function fetchDomainsRecords({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const client = createAPIClient(instance.config);
  await jobState.iterateEntities(
    { _type: Entities.DOMAIN._type },
    async (domain) => {
      await client.iterateDomainRecords(
        domain.domainName as string,
        async (record) => {
          await jobState.addEntity(createDomainRecordEntity(record));
        },
      );
    },
  );
}
