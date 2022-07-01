import { StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const imageSpec: StepSpec<IntegrationConfig>[] = [
  {
    id: 'fetch-images',
    name: 'Fetch Images',
    entities: [
      {
        resourceName: 'Image',
        _type: 'digitalocean_image',
        _class: ['Image'],
      },
    ],
    relationships: [],
    mappedRelationships: [],
    dependsOn: [],
    implemented: true,
  },
];
