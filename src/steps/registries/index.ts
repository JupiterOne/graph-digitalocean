import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { Entities } from '../constants';
import { createContainerRegistryEntity } from './converters';

export const registrySteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: 'fetch-container-registries',
    name: 'Fetch Container Registries',
    entities: [Entities.CONTAINER_REGISTRY],
    relationships: [],
    mappedRelationships: [],
    dependsOn: [],
    executionHandler: fetchContainerRegistries,
  },
];

export async function fetchContainerRegistries({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const client = createAPIClient(instance.config);
  await client.iterateContainerRegistries(async (registry) => {
    await jobState.addEntity(createContainerRegistryEntity(registry));
  });
}
