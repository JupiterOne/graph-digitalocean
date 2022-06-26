import { StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const volumeSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: /v2/volumes
     * PATTERN: resource iteratee
     */
    id: 'fetch-volumes',
    name: 'Fetch Volumes',
    entities: [
      {
        resourceName: 'Volume',
        _type: 'digitalocean_volume',
        _class: ['DataStore', 'Disk'],
      },
    ],
    relationships: [],
    dependsOn: [],
    implemented: true,
  },
];
