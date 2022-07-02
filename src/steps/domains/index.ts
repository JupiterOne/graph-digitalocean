import {
  createDirectRelationship,
  getRawData,
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import {
  DigitalOceanDomain,
  DigitalOceanDomainRecord,
} from '../../types/domainType';
import { Entities, Relationships, Steps } from '../constants';
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
    relationships: [Relationships.DOMAIN_HAS_DOMAIN_RECORD],
    dependsOn: [Steps.DOMAINS],
    executionHandler: fetchDomainsRecords,
  },
];

// TODO: Would it be better to have domain as the target of an mapped
// relationship since the domain itself might exist elsewhere in the graph
async function fetchDroplets({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const client = createAPIClient(instance.config);
  await client.iterateDomains(async (domain) => {
    await jobState.addEntity(createDomainEntity(domain));
  });
}

// TODO create relationship between domainrecord and ip/host?
async function fetchDomainsRecords({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const client = createAPIClient(instance.config);
  await jobState.iterateEntities(
    { _type: Entities.DOMAIN._type },
    async (domainEntity) => {
      const domain = getRawData<DigitalOceanDomain>(
        domainEntity,
      ) as DigitalOceanDomain;

      await client.iterateDomainRecords(
        domain.name,
        async (record: DigitalOceanDomainRecord) => {
          const domainRecordEntity = await jobState.addEntity(
            createDomainRecordEntity(record),
          );

          await jobState.addRelationship(
            createDirectRelationship({
              from: domainEntity,
              to: domainRecordEntity,
              _class: Relationships.DOMAIN_HAS_DOMAIN_RECORD._class,
            }),
          );
        },
      );
    },
  );
}
