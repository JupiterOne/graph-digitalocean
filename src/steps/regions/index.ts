import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../config';
import { Entities, Relationships, Steps } from '../constants';
import { createRegionEntityRelationship } from './util';

// TODO: A second look at this step would be helpful.
// May be able to parallelize this step.
// Also should reason about safety better.
export const regionsSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.REGIONS,
    name: 'Fetch Regions',
    entities: [Entities.REGION],
    relationships: [
      Relationships.REGION_HOSTS_DROPLET,
      Relationships.REGION_HOSTS_RESERVED_IP,
    ],
    mappedRelationships: [],
    dependsOn: [Steps.DROPLETS, Steps.RESERVED_IPS],

    executionHandler: fetchRegions,
  },
];

async function fetchRegions({
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  await jobState.iterateEntities(
    { _type: Entities.DROPLET._type },
    async (dropletEntity) => {
      await createRegionEntityRelationship(jobState, dropletEntity);
    },
  );

  await jobState.iterateEntities(
    { _type: Entities.RESERVED_IP._type },
    async (reservedIpEntity) => {
      await createRegionEntityRelationship(jobState, reservedIpEntity);
    },
  );
}
