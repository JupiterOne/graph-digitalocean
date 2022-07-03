import { createIntegrationEntity } from '@jupiterone/integration-sdk-core';
import { DigitalOceanDroplet } from '../../types/dropletType';
import { createEntityKey, Entities } from '../constants';

// TODO: add more fields
export function createDropletEntity(droplet: DigitalOceanDroplet) {
  return createIntegrationEntity({
    entityData: {
      source: {
        ...droplet,
        tags: [],
      }, // need to clean raw data
      assign: {
        _key: createEntityKey(Entities.DROPLET, droplet.id),
        _class: Entities.DROPLET._class,
        _type: Entities.DROPLET._type,
        name: droplet.name,
        id: droplet.id.toString(),
        hostname: droplet.name,
      },
    },
  });
}
