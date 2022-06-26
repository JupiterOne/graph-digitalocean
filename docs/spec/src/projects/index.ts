import { StepSpec } from '@jupiterone/integration-sdk-core';
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
    relationships: [],
    dependsOn: [],
    implemented: true,
  },
];
