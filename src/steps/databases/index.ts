import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { DigitalOceanDatabase } from '../../types/databaseType';
import { Entities, Steps } from '../constants';
import { createDatabaseEntity } from './converters';

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
