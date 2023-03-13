import { StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const firewallSpec: StepSpec<IntegrationConfig>[] = [
  {
    id: 'fetch-firewalls',
    name: 'Fetch Firewalls',
    entities: [
      {
        resourceName: 'Firewall',
        _type: 'digitalocean_firewall',
        _class: ['Firewall'],
      },
    ],
    relationships: [],
    mappedRelationships: [],
    dependsOn: ['fetch-droplets'],
    implemented: false,
  },
];
