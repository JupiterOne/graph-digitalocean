import {
  createDirectRelationship,
  getRawData,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { DigitalOceanVolume } from '../../types/volumeType';
import { createEntityKey, Entities, Relationships, Steps } from '../constants';
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
  {
    id: Steps.BUILD_VOLUME_DROPLET_RELATIONSHIPS,
    name: 'Build Volume Droplet Relationships',
    entities: [],
    relationships: [Relationships.DROPLET_USES_VOLUME],
    dependsOn: [Steps.DROPLETS, Steps.VOLUMES],
    executionHandler: buildVolumeDropletRelationships,
  },
];

export async function fetchVolumes({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const client = createAPIClient(instance.config);
  await client.iterateVolumes(async (volume) => {
    await jobState.addEntity(createVolumeEntity(volume));
  });
}

export async function buildVolumeDropletRelationships({
  logger,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  await jobState.iterateEntities(
    { _type: Entities.VOLUME._type },
    async (volumeEntity) => {
      const volume = getRawData<DigitalOceanVolume>(
        volumeEntity,
      ) as DigitalOceanVolume;

      const dropletIds: number[] = volume?.droplet_ids;

      for (const dropletId of dropletIds) {
        const dropletKey = createEntityKey(Entities.DROPLET, dropletId);
        const dropletEntity = await jobState.findEntity(dropletKey);

        if (dropletEntity === null) {
          logger.warn({ dropletKey }, 'Could not find droplet in jobState.');
          continue;
        }

        await jobState.addRelationship(
          createDirectRelationship({
            from: dropletEntity,
            to: volumeEntity,
            _class: RelationshipClass.USES,
          }),
        );
      }
    },
  );
}
