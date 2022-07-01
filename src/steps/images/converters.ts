import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';
import { DigitalOceanImage } from '../../types/imageType';
import { Entities } from '../constants';

export function createImageKey(id: number) {
  return 'digitalocean_image:' + id.toString();
}

// TODO: Add other properties
export function createImageEntity(image: DigitalOceanImage): Entity {
  return createIntegrationEntity({
    entityData: {
      source: {
        ...image,
        tags: undefined,
      },
      assign: {
        _key: createImageKey(image.id),
        _class: Entities.IMAGE._class,
        _type: Entities.IMAGE._type,
        name: image.name,
        id: image.id.toString(),
        distribution: image.distribution,
        public: image.public,
        type: image.type,
        description: image.description,
        status: image.status,
        createdOn: parseTimePropertyValue(image.created_at),
      },
    },
  });
}
