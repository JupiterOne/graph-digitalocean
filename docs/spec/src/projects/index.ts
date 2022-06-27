import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const projectSpec: StepSpec<IntegrationConfig>[] = [
  {
    id: 'fetch-projects',
    name: 'Fetch Projects',
    entities: [
      {
        resourceName: 'Project',
        _type: 'digitalocean_project',
        _class: ['Project'],
      },
    ],
    relationships: [
      {
        _class: RelationshipClass.HAS,
        _type: 'digitalocean_account_has_project',
        sourceType: 'digitalocean_account',
        targetType: 'digitalocean_project',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
];
