import { StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const registrySpec: StepSpec<IntegrationConfig>[] = [
  {
    id: 'fetch-container-registries',
    name: 'Fetch Container Registries',
    entities: [
      {
        resourceName: 'Container Registry',
        _type: 'digitalocean_container_registry',
        _class: ['Repository'],
      },
    ],
    relationships: [],
    mappedRelationships: [],
    dependsOn: [],
    implemented: true,
  },
];
