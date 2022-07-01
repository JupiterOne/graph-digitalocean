import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';
import { DigitalOceanSnapshot } from '../../types/snapshotType';
import { Entities } from '../constants';

// TODO: add other properties such as region or make relatoinship to region?
export function createSnapshotEntity(snapshot: DigitalOceanSnapshot): Entity {
  const _type =
    snapshot.resource_type === 'droplet'
      ? Entities.DROPLET_SNAPSHOT._type
      : Entities.VOLUME_SNAPSHOT._type;

  const _key =
    snapshot.resource_type === 'droplet'
      ? 'digitalocean_droplet_snapshot_' + snapshot.id
      : 'digitalocean_volume_snapshot_' + snapshot.id;

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
