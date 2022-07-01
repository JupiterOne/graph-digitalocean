import {
  createDirectRelationship,
  getRawData,
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { DigitalOceanDroplet } from '../../types/dropletType';
import { Entities, Relationships, Steps } from '../constants';
import { createDropletEntity, createDropletSnapshotEntity } from './converter';
export const dropletSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.DROPLETS,
    name: 'Fetch Droplets',
    entities: [Entities.DROPLET],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchDroplets,
  },
  {
    id: Steps.DROPLET_SNAPSHOTS,
    name: 'Fetch Droplet Snapshots',
    entities: [Entities.DROPLET_SNAPSHOT],
    relationships: [],
    dependsOn: [Steps.DROPLETS],
    executionHandler: fetchDropletSnapshots,
  },
];

export async function fetchDroplets({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const client = createAPIClient(instance.config);
  await client.iterateDroplets(async (droplet) => {
    await jobState.addEntity(createDropletEntity(droplet));
  });
}

export async function fetchDropletSnapshots({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const client = createAPIClient(instance.config);
  await jobState.iterateEntities(Entities.DROPLET, async (dropletEntity) => {
    const droplet = getRawData<DigitalOceanDroplet>(
      dropletEntity,
    ) as DigitalOceanDroplet;

    await client.iterateDropletSnapshots(droplet.id, async (snapshot) => {
      const snapshotEntity = await jobState.addEntity(
        createDropletSnapshotEntity(snapshot),
      );

      await jobState.addRelationship(
        createDirectRelationship({
          from: dropletEntity,
          to: snapshotEntity,
          _class: Relationships.DROPLET_HAS_SNAPSHOT._class,
        }),
      );
    });
  });
}
