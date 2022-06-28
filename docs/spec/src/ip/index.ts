import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const ipSpec: StepSpec<IntegrationConfig>[] = [
  {
    id: 'fetch-reserved-ips',
    name: 'Fetch Reserved IPs',
    entities: [
      {
        resourceName: 'Reserved IP',
        _type: 'digitalocean_reserved_ip',
        _class: ['IpAddress'],
      },
    ],
    relationships: [
      {
        _class: RelationshipClass.USES,
        sourceType: 'digitalocean_droplet',
        targetType: 'digitalocean_reserved_ip',
        _type: 'digitalocean_droplet_uses_reserved_ip',
      },
    ],
    dependsOn: ['fetch-droplets'],
    implemented: true,
  },
];
