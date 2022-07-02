import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const alertPolicySpec: StepSpec<IntegrationConfig>[] = [
  {
    id: 'fetch-alert-policies',
    name: 'Fetch Alert Policies',
    entities: [
      {
        resourceName: 'Alert Policy',
        _type: 'digitalocean_alert_policy',
        _class: ['Rule'],
      },
    ],
    relationships: [
      {
        targetType: 'digitalocean_alert_policy',
        sourceType: 'digitalocean_droplet',
        _type: 'digitalocean_droplet_has_alert_policy',
        _class: RelationshipClass.HAS,
      },
    ],
    mappedRelationships: [],
    dependsOn: ['fetch-droplets'],
    implemented: true,
  },
];
