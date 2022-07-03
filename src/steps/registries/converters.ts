import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';
import { DigitalOceanContainerRegistry } from '../../types/registryType';
import { createEntityKey, Entities } from '../constants';

// TODO: add other properties
export function createContainerRegistryEntity(
  registry: DigitalOceanContainerRegistry,
): Entity {
  return createIntegrationEntity({
    entityData: {
      source: registry,
      assign: {
        _key: createEntityKey(Entities.CONTAINER_REGISTRY, registry.name),
        _class: Entities.CONTAINER_REGISTRY._class,
        _type: Entities.CONTAINER_REGISTRY._type,
        name: registry.name,
        displayName: registry.name,
        createdOn: parseTimePropertyValue(registry.created_at),
      },
    },
  });
}
