import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { Entities, Steps } from '../constants';
import { createReservedIpEntity } from './converters';

export const ipSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.RESERVED_IPS,
    name: 'Fetch Reserved IPs',
    entities: [Entities.RESERVED_IP],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchReservedIps,
  },
];

export async function fetchReservedIps({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const client = createAPIClient(instance.config);
  await client.iterateReservedIps(async (floatingIp) => {
    await jobState.addEntity(createReservedIpEntity(floatingIp));
  });
}
