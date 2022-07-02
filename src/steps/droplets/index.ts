import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { Entities, Steps } from '../constants';
import { createDropletEntity } from './converter';
export const dropletSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.DROPLETS,
    name: 'Fetch Droplets',
    entities: [Entities.DROPLET],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchDroplets,
  },
];

async function fetchDroplets({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const client = createAPIClient(instance.config);
  await client.iterateDroplets(async (droplet) => {
    await jobState.addEntity(createDropletEntity(droplet));
  });
}
