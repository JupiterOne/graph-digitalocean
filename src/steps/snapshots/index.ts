import {
  createDirectRelationship,
  IntegrationMissingKeyError,
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { Entities, Relationships, Steps } from '../constants';
import { createDropletKey } from '../droplets/converter';
import { createSnapshotEntity } from './converters';

export const snapshotsSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.SNAPSHOTS,
    name: 'Fetch Snapshots',
    entities: [Entities.DROPLET_SNAPSHOT, Entities.VOLUME_SNAPSHOT],
    relationships: [
      Relationships.VOLUME_HAS_SNAPSHOT,
      Relationships.DROPLET_HAS_SNAPSHOT,
    ],
    mappedRelationships: [],
    dependsOn: [Steps.DROPLETS, Steps.VOLUMES],
    executionHandler: fetchSnapshots,
  },
];

export async function fetchSnapshots({
  instance,
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const client = createAPIClient(instance.config);
  await client.iterateSnapshots(async (snapshot) => {
    const snapshotEntity = await jobState.addEntity(
      createSnapshotEntity(snapshot),
    );

    if (snapshot.resource_type === 'droplet') {
      const dropletKey = createDropletKey(snapshot.resource_id);
      const dropletEntity = await jobState.findEntity(dropletKey);

      if (!dropletEntity) {
        throw new IntegrationMissingKeyError(
          `Droplet entity not found ${dropletKey}`,
        );
      }

      await jobState.addRelationship(
        createDirectRelationship({
          from: dropletEntity,
          to: snapshotEntity,
          _class: Relationships.DROPLET_HAS_SNAPSHOT._class,
        }),
      );
    } else {
      const volumeEntity = await jobState.findEntity(snapshot.resource_id);
      if (!volumeEntity) {
        throw new IntegrationMissingKeyError(
          `Volume entity not found ${snapshot.resource_id}`,
        );
      }
      await jobState.addRelationship(
        createDirectRelationship({
          from: volumeEntity,
          to: snapshotEntity,
          _class: Relationships.VOLUME_HAS_SNAPSHOT._class,
        }),
      );
    }
  });
}
