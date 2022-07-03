import {
  createDirectRelationship,
  IntegrationMissingKeyError,
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { createEntityKey, Entities, Relationships, Steps } from '../constants';
import { createAlertPolicyEntity } from './converters';

export const alertPolicySteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.ALERT_POLICIES,
    name: 'Fetch Alert Policies',
    entities: [Entities.ALERT_POLICY],
    relationships: [Relationships.DROPLET_HAS_ALERT_POLICY],
    mappedRelationships: [],
    dependsOn: [Steps.DROPLETS],
    executionHandler: fetchAlertPolicies,
  },
];

// TODO: not creating relationships from tags yet
async function fetchAlertPolicies({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const client = createAPIClient(instance.config);
  await client.iterateAlertPolicies(async (alertPolicy) => {
    const alertPolicyEntity = await jobState.addEntity(
      createAlertPolicyEntity(alertPolicy),
    );

    for (const dropletId of alertPolicy.entities) {
      const dropletKey = createEntityKey(Entities.DROPLET, dropletId);
      const dropletEntity = await jobState.findEntity(dropletKey);
      if (!dropletEntity) {
        throw new IntegrationMissingKeyError(
          `Droplet entity not found: ${dropletKey}`,
        );
      }

      await jobState.addRelationship(
        createDirectRelationship({
          from: dropletEntity,
          to: alertPolicyEntity,
          _class: Relationships.DROPLET_HAS_ALERT_POLICY._class,
        }),
      );
      // TODO: Add mapped relationships to users and slack channels
    }
  });
}
