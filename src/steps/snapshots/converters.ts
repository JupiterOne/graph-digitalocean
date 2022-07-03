import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';
import { DigitalOceanSnapshot } from '../../types/snapshotType';
import { createEntityKey, Entities } from '../constants';

// TODO: add other properties such as region or make relationship to region?
export function createSnapshotEntity(snapshot: DigitalOceanSnapshot): Entity {
  const _type =
    snapshot.resource_type === 'droplet'
      ? Entities.DROPLET_SNAPSHOT._type
      : Entities.VOLUME_SNAPSHOT._type;

  const _key =
    snapshot.resource_type === 'droplet'
      ? createEntityKey(Entities.DROPLET_SNAPSHOT, snapshot.id)
      : createEntityKey(Entities.VOLUME_SNAPSHOT, snapshot.id);

  return createIntegrationEntity({
    entityData: {
      source: {
        snapshot,
        tags: [],
      },
      assign: {
        _key,
        _class: Entities.DROPLET_SNAPSHOT._class,
        _type,
        name: snapshot.name,
        displayName: snapshot.name,
        id: snapshot.id,
        resourceId: snapshot.resource_id,
        createdOn: parseTimePropertyValue(snapshot.created_at),
      },
    },
  });
}
