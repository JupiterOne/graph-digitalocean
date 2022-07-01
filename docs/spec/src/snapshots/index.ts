import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const snapshotSpec: StepSpec<IntegrationConfig>[] = [
  {
    id: 'fetch-snapshots',
    name: 'Fetch Snapshots',
    entities: [
      {
        resourceName: 'Droplet Snapshot',
        _type: 'digitalocean_droplet_snapshot',
        _class: ['Image'],
      },
      {
        resourceName: 'Volume Snapshot',
        _type: 'digitalocean_volume_snapshot',
        _class: ['Image'],
      },
    ],
    relationships: [
      {
        sourceType: 'digitalocean_volume',
        targetType: 'digitalocean_volume_snapshot',
        _type: 'digitalocean_volume_has_snapshot',
        _class: RelationshipClass.HAS,
      },
      {
        sourceType: 'digitalocean_droplet',
        targetType: 'digitalocean_droplet_snapshot',
        _type: 'digitalocean_droplet_has_snapshot',
        _class: RelationshipClass.HAS,
      },
    ],
    mappedRelationships: [],
    dependsOn: ['fetch-droplets', 'fetch-volumes'],
    implemented: true,
  },
];
