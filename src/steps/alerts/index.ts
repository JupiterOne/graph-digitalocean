import {
  createDirectRelationship,
  createMappedRelationship,
  IntegrationMissingKeyError,
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import {
  createEntityKey,
  Entities,
  MappedRelationships,
  Relationships,
  Steps,
  TargetEntities,
} from '../constants';
import { createAlertPolicyEntity } from './converters';

const SLACK_WEBHOOK_PREFIX = 'https://hooks.slack.com/services/';

export const alertPolicySteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.ALERT_POLICIES,
    name: 'Fetch Alert Policies',
    entities: [Entities.ALERT_POLICY],
    relationships: [Relationships.DROPLET_HAS_ALERT_POLICY],
    mappedRelationships: [
      MappedRelationships.ALERT_POLICY_NOTIFIES_SLACK_CHANNEL,
    ],
    dependsOn: [Steps.DROPLETS],
    executionHandler: fetchAlertPolicies,
  },
];

// TODO: not creating relationships from tags yet
async function fetchAlertPolicies({
  instance,
  jobState,
  logger,
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
    }

    for (const { channel, url } of alertPolicy.alerts.slack) {
      if (url.startsWith(SLACK_WEBHOOK_PREFIX)) {
        const teamId = url.slice(SLACK_WEBHOOK_PREFIX.length).split('/')[0];
        // slack channel names can't contain `#` so it's safe to just call replace
        const trimmedChannelName = channel.replace(/^#/, '');
        await jobState.addRelationship(
          createMappedRelationship({
            source: alertPolicyEntity,
            targetFilterKeys: [['teamId', 'name']],
            _type:
              MappedRelationships.ALERT_POLICY_NOTIFIES_SLACK_CHANNEL._type,
            target: {
              _key: `slack_channel:team_${teamId}:channel_${trimmedChannelName}`,
              _type: TargetEntities.SLACK_CHANNEL._type,
              _class: TargetEntities.SLACK_CHANNEL._class,
              teamId,
              name: trimmedChannelName,
            },
            _class:
              MappedRelationships.ALERT_POLICY_NOTIFIES_SLACK_CHANNEL._class,
          }),
        );
      } else {
        logger.warn('Slack alert does not begin with expected prefix');
      }
    }
  });
}
