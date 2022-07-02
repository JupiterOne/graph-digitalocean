import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { Entities, Steps } from '../constants';
import { createCertificateEntity } from './converters';

export const certificateSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.CERTIFICATES,
    name: 'Fetch Certificates',
    entities: [Entities.CERTIFICATE],
    relationships: [],
    mappedRelationships: [],
    dependsOn: [],
    executionHandler: fetchCertificates,
  },
];

// TODO: Use DNS names to map to Domain entities
async function fetchCertificates({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const client = createAPIClient(instance.config);
  await client.iterateCertificates(async (certificate) => {
    await jobState.addEntity(createCertificateEntity(certificate));
  });
}
