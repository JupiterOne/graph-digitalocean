import {
  createDirectRelationship,
  IntegrationMissingKeyError,
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { createEntityKey, Entities, Relationships, Steps } from '../constants';
import { createReservedIpEntity } from './converters';

export const ipSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.RESERVED_IPS,
    name: 'Fetch Reserved IPs',
    entities: [Entities.RESERVED_IP],
    relationships: [Relationships.DROPLET_USES_RESERVED_IP],
    dependsOn: [Steps.DROPLETS],
    executionHandler: fetchReservedIps,
  },
];

async function fetchReservedIps({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const client = createAPIClient(instance.config);
  await client.iterateReservedIps(async (reservedIp) => {
    const reservedIpEntity = await jobState.addEntity(
      createReservedIpEntity(reservedIp),
    );

    if (reservedIp.droplet) {
      const dropletEntity = await jobState.findEntity(
        createEntityKey(Entities.DROPLET, reservedIp.droplet.id),
      );

      if (!dropletEntity) {
        throw new IntegrationMissingKeyError('Failed to find droplet entity');
      }

      await jobState.addRelationship(
        createDirectRelationship({
          from: dropletEntity,
          to: reservedIpEntity,
          _class: Relationships.DROPLET_USES_RESERVED_IP._class,
        }),
      );
    }
  });
}
