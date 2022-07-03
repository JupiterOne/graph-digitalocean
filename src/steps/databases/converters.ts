import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';
import {
  DigitalOceanDatabase,
  DigitalOceanDatabaseBackup,
  DigitalOceanDatabaseCertificate,
} from '../../types/databaseType';
import { createEntityKey, Entities } from '../constants';

// TODO: Add other properties
export function createDatabaseEntity(database: DigitalOceanDatabase) {
  return createIntegrationEntity({
    entityData: {
      // TODO: scrub raw data for sensitive data
      source: {},
      assign: {
        _key: createEntityKey(Entities.DATABASE, database.id),
        _class: Entities.DATABASE._class,
        _type: Entities.DATABASE._type,
        id: database.id,
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
        // TODO enable raw data for db so this can be better
        _key: createEntityKey(
          Entities.DATABASE_CERTIFICATE,
          database.id as string,
        ),
        _class: Entities.DATABASE_CERTIFICATE._class,
        _type: Entities.DATABASE_CERTIFICATE._type,
        name: database.name + ' Certificate',
        displayName: database.name + ' Certificate',
        certificate: databaseCert.certificate,
      },
    },
  });
}

export function createDatabaseBackupEntity(
  database: Entity,
  databaseBackup: DigitalOceanDatabaseBackup,
) {
  const createdOn = parseTimePropertyValue(databaseBackup.created_at);

  return createIntegrationEntity({
    entityData: {
      source: databaseBackup,
      assign: {
        _key: createEntityKey(
          Entities.DATABASE_BACKUP,
          (database.id as string) + createdOn,
        ),
        _class: Entities.DATABASE_BACKUP._class,
        _type: Entities.DATABASE_BACKUP._type,
        createdOn,
        name: database.name + ' Backup',
        displayName: database.name + ' Backup',
        // TODO: normalize size?
        sizeGigabytes: databaseBackup.size_gigabytes,
      },
    },
  });
}
