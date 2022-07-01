import {
  createIntegrationEntity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';
import {
  DigitalOceanDroplet,
  DigitalOceanDropletSnapshot,
} from '../../types/dropletType';
import { Entities } from '../constants';

export function createDropletKey(dropletId: number | string) {
  if (typeof dropletId === 'number') {
    return 'digitalocean_droplet:' + dropletId.toString();
  }
  return 'digitalocean_droplet:' + dropletId;
}

// TODO: add more fields
export function createDropletEntity(droplet: DigitalOceanDroplet) {
  return createIntegrationEntity({
    entityData: {
      source: {
        ...droplet,
        tags: [],
      }, // need to clean raw data
      assign: {
        _key: createDropletKey(droplet.id),
        _class: Entities.DROPLET._class,
        _type: Entities.DROPLET._type,
        name: droplet.name,
        id: droplet.id.toString(),
        hostname: droplet.name,
      },
    },
  });
}

// TODO: could add in more fields by pulling from images step or droplet
export function createDropletSnapshotEntity(
  snapshot: DigitalOceanDropletSnapshot,
) {
  console.log(snapshot);
  return createIntegrationEntity({
    entityData: {
      source: snapshot,
      assign: {
        _key: 'digitalocean_droplet_snapshot:' + snapshot.id.toString(),
        _class: Entities.DROPLET_SNAPSHOT._class,
        _type: Entities.DROPLET_SNAPSHOT._type,
        createdOn: parseTimePropertyValue(snapshot.created_at),
        id: snapshot.id.toString(),
        name: snapshot.name,
        displayName: snapshot.name,
        type: snapshot.type,
      },
    },
  });
}
