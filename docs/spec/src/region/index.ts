import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const regionSpec: StepSpec<IntegrationConfig>[] = [
  {
    id: 'fetch-regions',
    name: 'Fetch Regions',
    entities: [
      {
        resourceName: 'Region',
        _type: 'digitalocean_region',
        _class: ['Site'],
      },
    ],
    relationships: [
      {
        sourceType: 'digitalocean_region',
        targetType: 'digitalocean_droplet',
        _type: 'digitalocean_region_hosts_droplet',
        _class: RelationshipClass.HOSTS,
      },
      {
        sourceType: 'digitalocean_region',
        targetType: 'digitalocean_reserved_ip',
        _type: 'digitalocean_region_hosts_reserved_ip',
        _class: RelationshipClass.HOSTS,
      },
      {
        sourceType: 'digitalocean_region',
        targetType: 'digitalocean_volume',
        _type: 'digitalocean_region_hosts_volume',
        _class: RelationshipClass.HOSTS,
      },
    ],
    mappedRelationships: [],
    dependsOn: ['fetch-droplets', 'fetch-reserved-ips'],
    implemented: true,
  },
];
