import { StepSpec } from '@jupiterone/integration-sdk-core';
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
    relationships: [],
    dependsOn: [],
    implemented: true,
  },
];
