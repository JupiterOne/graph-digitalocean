import {
  createDirectRelationship,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { DigitalOceanDatabase } from '../../types/databaseType';
import { Entities, Relationships, Steps } from '../constants';
import {
  createDatabaseBackupEntity,
  createDatabaseCertificateEntity,
  createDatabaseEntity,
} from './converters';

export const databaseSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.DATABASES,
    name: 'Fetch Databases',
    entities: [Entities.DATABASE],
    relationships: [],
    mappedRelationships: [],
    dependsOn: [],
    executionHandler: fetchDatabases,
  },
  {
    id: Steps.DATABASE_CERTIFICATES,
    name: 'Fetch Database Certificates',
    entities: [Entities.DATABASE_CERTIFICATE],
    relationships: [Relationships.DATABASE_HAS_CERTIFICATE],
    dependsOn: [Steps.DATABASES],
    executionHandler: fetchDatabaseCertificates,
  },
  {
    id: Steps.DATABASE_BACKUPS,
    name: 'Fetch Database Backups',
    entities: [Entities.DATABASE_BACKUP],
    relationships: [Relationships.DATABASE_HAS_BACKUP],
    dependsOn: [Steps.DATABASES],
    executionHandler: fetchDatabaseBackups,
  },
];

async function fetchDatabases({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const client = createAPIClient(instance.config);
  await client.iterateDatabases(async (database: DigitalOceanDatabase) => {
    await jobState.addEntity(createDatabaseEntity(database));
  });
}

// TODO: this data may not be worth ingesting
async function fetchDatabaseCertificates({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const client = createAPIClient(instance.config);
  await jobState.iterateEntities(
    { _type: Entities.DATABASE._type },
    async (databaseEntity) => {
      const databaseCert = await client.getDatabaseCA(
        databaseEntity.id as string,
      );
      const databasePublicCert = await jobState.addEntity(
        createDatabaseCertificateEntity(databaseEntity, databaseCert),
      );

      await jobState.addRelationship(
        createDirectRelationship({
          from: databaseEntity,
          to: databasePublicCert,
          _class: RelationshipClass.HAS,
        }),
      );
    },
  );
}

async function fetchDatabaseBackups({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const client = createAPIClient(instance.config);
  await jobState.iterateEntities(
    { _type: Entities.DATABASE._type },
    async (databaseEntity) => {
      await client.iterateDatabaseBackups(
        databaseEntity.id as string,
        async (backup) => {
          const dbBackupEntity = await jobState.addEntity(
            createDatabaseBackupEntity(databaseEntity, backup),
          );

          await jobState.addRelationship(
            createDirectRelationship({
              _class: RelationshipClass.HAS,
              from: databaseEntity,
              to: dbBackupEntity,
            }),
          );
        },
      );
    },
  );
}
