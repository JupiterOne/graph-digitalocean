import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
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
  {
    id: 'build-volume-droplet-relationships',
    name: 'Build Volume Droplet Relationships',
    entities: [],
    relationships: [
      {
        _class: RelationshipClass.USES,
        sourceType: 'digitalocean_droplet',
        targetType: 'digitalocean_volume',
        _type: 'digitalocean_droplet_uses_volume',
      },
    ],
    dependsOn: ['fetch-droplets', 'fetch-volumes'],
    implemented: true,
  },
];
