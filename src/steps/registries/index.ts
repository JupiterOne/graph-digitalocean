import {
  Entity,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
  createDirectRelationship,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { Entities, Relationships, Steps } from '../constants';
import { createContainerRegistryEntity } from './converters';
import { ACCOUNT_ENTITY_KEY } from '../account';

export const registrySteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: 'fetch-container-registries',
    name: 'Fetch Container Registries',
    entities: [Entities.CONTAINER_REGISTRY],
    relationships: [Relationships.ACCOUNT_HAS_REGISTRY],
    mappedRelationships: [],
    dependsOn: [Steps.ACCOUNT],
    executionHandler: fetchContainerRegistries,
  },
];

export async function fetchContainerRegistries({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const client = createAPIClient(instance.config);

  const accountEntity = (await jobState.getData(ACCOUNT_ENTITY_KEY)) as Entity;

  await client.iterateContainerRegistries(async (registry) => {
    const registryEntity = await jobState.addEntity(
      createContainerRegistryEntity(registry),
    );

    await jobState.addRelationship(
      createDirectRelationship({
        _class: RelationshipClass.HAS,
        from: accountEntity,
        to: registryEntity,
      }),
    );
  });
}
