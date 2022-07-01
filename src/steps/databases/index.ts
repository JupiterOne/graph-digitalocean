import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { DigitalOceanDatabase } from '../../types/databaseType';
import { Entities, Steps } from '../constants';
import {
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
    relationships: [],
    dependsOn: [Steps.DATABASES],
    executionHandler: fetchDatabaseCertificates,
  },
];

export async function fetchDatabases({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const client = createAPIClient(instance.config);
  await client.iterateDatabases(async (database: DigitalOceanDatabase) => {
    await jobState.addEntity(createDatabaseEntity(database));
  });
}

// TODO: this data may not be worth ingesting
export async function fetchDatabaseCertificates({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const client = createAPIClient(instance.config);
  await jobState.iterateEntities(
    { _type: Entities.DATABASE._type },
    async (databaseEntity) => {
      const databaseCert = await client.getDatabaseCA(databaseEntity._key);
      await jobState.addEntity(
        createDatabaseCertificateEntity(databaseEntity, databaseCert),
      );
    },
  );
}
