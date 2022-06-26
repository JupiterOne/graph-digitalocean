import { IntegrationStep } from '@jupiterone/integration-sdk-core';
import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { Entities, Steps } from '../constants';
import { createVolumeEntity } from './converter';

export const volumeSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.VOLUMES,
    name: 'Fetch Volumes',
    entities: [Entities.VOLUME],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchVolumes,
  },
];

export async function fetchVolumes({ instance, jobState }) {
  const client = createAPIClient(instance.config);
  await client.iterateVolumes(async (volume) => {
    await jobState.addEntity(createVolumeEntity(volume));
  });
}
