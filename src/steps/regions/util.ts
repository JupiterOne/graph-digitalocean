// This isn't a type-safe function. We could pass an entity that doesn't have

import {
  createDirectRelationship,
  Entity,
  getRawData,
  IntegrationMissingKeyError,
  JobState,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';
import { DigitalOceanDroplet } from '../../types/dropletType';
import { DigitalOceanReservedIP } from '../../types/ipType';
import { DigitalOceanRegion } from '../../types/regionType';
import { DigitalOceanVolume } from '../../types/volumeType';
import { createRegionEntity, createRegionKey } from './converters';

// region, so we should be careful about the type of Entity we pass manually.
export async function createRegionEntityRelationship(
  jobState: JobState,
  targetEntity: Entity,
): Promise<void> {
  const entityRawData = getRawData(targetEntity) as
    | DigitalOceanDroplet
    | DigitalOceanReservedIP
    | DigitalOceanVolume;

  if (!entityRawData.region) {
    throw new IntegrationMissingKeyError(
      `Entity has no region: ${targetEntity._key}`,
    );
  }

  const regionEntity = await findOrCreateRegionEntity(
    jobState,
    entityRawData.region,
  );

  await jobState.addRelationship(
    createDirectRelationship({
      from: regionEntity,
      to: targetEntity,
      _class: RelationshipClass.HOSTS,
    }),
  );
}

export async function findOrCreateRegionEntity(
  jobState: JobState,
  region: DigitalOceanRegion,
): Promise<Entity> {
  if (jobState.hasKey(createRegionKey(region.slug))) {
    return (await jobState.findEntity(createRegionKey(region.slug))) as Entity;
  } else {
    return jobState.addEntity(createRegionEntity(region));
  }
}
