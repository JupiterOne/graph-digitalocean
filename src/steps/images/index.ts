import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { Entities, Steps } from '../constants';
import { createImageEntity } from './converters';

export const imagesSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.IMAGE,
    name: 'Fetch Images',
    entities: [Entities.IMAGE],
    relationships: [],
    mappedRelationships: [],
    dependsOn: [],
    executionHandler: fetchImages,
  },
];

export async function fetchImages({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const client = createAPIClient(instance.config);
  await client.iterateImages(async (image) => {
    await jobState.addEntity(createImageEntity(image));
  });
}
