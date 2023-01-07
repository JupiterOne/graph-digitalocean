import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { Entities, Steps } from '../constants';
import { createFirewallEntity } from './converters';

/**
 * TODO: Firewall needs worked out rules and relationships before we
 * add it to the graph. It is disabled for now by not being included in the
 * integrationSteps export.
 */

export const firewallSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.FIREWALLS,
    name: 'Fetch Firewalls',
    entities: [Entities.FIREWALL],
    relationships: [],
    mappedRelationships: [],
    dependsOn: [Steps.DROPLETS],
    executionHandler: fetchFirewalls,
  },
];

async function fetchFirewalls({
  instance,
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const client = createAPIClient(instance.config);
  await client.iterateFirewalls(async (firewall) => {
    await jobState.addEntity(createFirewallEntity(firewall));
  });
}
