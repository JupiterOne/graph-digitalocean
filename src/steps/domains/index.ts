import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { Entities, Steps } from '../constants';
import { createDomainEntity } from './converter';

export const domainSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.DOMAINS,
    name: 'Fetch Domains',
    entities: [Entities.DOMAIN],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchDroplets,
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
