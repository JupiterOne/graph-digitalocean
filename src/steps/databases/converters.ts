import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';
import {
  DigitalOceanDatabase,
  DigitalOceanDatabaseCertificate,
} from '../../types/databaseType';
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

export function createDatabaseCertificateEntity(
  database: Entity,
  databaseCert: DigitalOceanDatabaseCertificate,
) {
  return createIntegrationEntity({
    entityData: {
      source: databaseCert,
      assign: {
        _key: 'digitalocean_database_certificate:' + database._key,
        _class: Entities.DATABASE_CERTIFICATE._class,
        _type: Entities.DATABASE_CERTIFICATE._type,
        name: database.name + ' Certificate',
        displayName: database.name + ' Certificate',
        certificate: databaseCert.certificate,
      },
    },
  });
}
