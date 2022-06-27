import {
  createIntegrationEntity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';
import { DigitalOceanVolume } from '../../types/volumeType';
import { Entities } from '../constants';

export function createVolumeEntity(volume: DigitalOceanVolume) {
  return createIntegrationEntity({
    entityData: {
      source: {
        ...volume,
        tags: [],
      },
      assign: {
        _key: volume.id,
        _type: Entities.VOLUME._type,
        _class: Entities.VOLUME._class,
        name: volume.name,
        description: volume.description,
        createdOn: parseTimePropertyValue(volume.description),
        filesystemType: volume.filesystem_type,
        filesystemLabel: volume.filesystem_label,
        // could add dropletids

        classification: null,
        encrypted: null,
      },
    },
  });
}
