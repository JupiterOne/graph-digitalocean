import { StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const dropletsSpec: StepSpec<IntegrationConfig>[] = [
  {
    id: 'fetch-droplets',
    name: 'Fetch Droplets',
    entities: [
      {
        resourceName: 'Droplet',
        _type: 'digitalocean_droplet',
        _class: ['Host'],
      },
    ],
    relationships: [],
    dependsOn: [],
    implemented: true,
  },
];
