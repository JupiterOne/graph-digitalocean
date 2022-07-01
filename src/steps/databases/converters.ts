import {
  createIntegrationEntity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';
import { DigitalOceanDatabase } from '../../types/databaseType';
import { Entities } from '../constants';

// TODO: Add other properties
export function createDatabaseEntity(database: DigitalOceanDatabase) {
  return createIntegrationEntity({
    entityData: {
      // TODO: scrub raw data for sensitive data
      source: {},
      assign: {
        _key: database.id,
        _class: Entities.DATABASE._class,
        _type: Entities.DATABASE._type,
        name: database.name,
        displayName: database.name,
        databaseEngine: database.engine,
        version: database.version,
        createdOn: parseTimePropertyValue(database.created_at),
      },
    },
  });
}
