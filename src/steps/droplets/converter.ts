import { createIntegrationEntity } from '@jupiterone/integration-sdk-core';
import { DigitalOceanDroplet } from '../../types/dropletType';
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
