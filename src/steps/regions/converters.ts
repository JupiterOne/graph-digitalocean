import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';
import { DigitalOceanRegion } from '../../types/regionType';
import { createEntityKey, Entities } from '../constants';

export function createRegionEntity(region: DigitalOceanRegion): Entity {
  return createIntegrationEntity({
    entityData: {
      source: region,
      assign: {
        _key: createEntityKey(Entities.REGION, region.slug),
        _class: Entities.REGION._class,
        _type: Entities.REGION._type,
        name: region.name,
        displayName: region.name,
        slug: region.slug,
        available: region.available,
      },
    },
  });
}
