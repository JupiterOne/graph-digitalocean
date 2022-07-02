import {
  createDirectRelationship,
  IntegrationMissingKeyError,
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { Entities, Relationships, Steps } from '../constants';
import { createDropletKey } from '../droplets/converter';
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
// TODO: make mapped relationships to slack channels
// TODO: make mapped relationships to users
export async function fetchAlertPolicies({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const client = createAPIClient(instance.config);
  await client.iterateAlertPolicies(async (alertPolicy) => {
    const alertPolicyEntity = await jobState.addEntity(
      createAlertPolicyEntity(alertPolicy),
    );

    for (const droplet of alertPolicy.entities) {
      const dropletKey = createDropletKey(droplet);
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
    }
  });
}
