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
  {
    id: 'fetch-droplet-snapshots',
    name: 'Fetch Droplet Snapshots',
    entities: [
      {
        resourceName: 'Droplet Snapshot',
        _type: 'digitalocean_droplet_snapshot',
        _class: ['Image'],
      },
    ],
    relationships: [],
    dependsOn: ['fetch-droplets'],
    implemented: true,
  },
];
