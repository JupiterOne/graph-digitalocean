import { StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const certificateSpec: StepSpec<IntegrationConfig>[] = [
  {
    id: 'fetch-certificates',
    name: 'Fetch Certificates',
    entities: [
      {
        resourceName: 'Certificate',
        _type: 'digitalocean_certificate',
        _class: ['Certificate'],
      },
    ],
    relationships: [],
    mappedRelationships: [],
    dependsOn: [],
    implemented: true,
  },
];
