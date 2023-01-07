import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
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
    relationships: [
      {
        sourceType: 'digitalocean_account',
        targetType: 'digitalocean_container_registry',
        _class: RelationshipClass.HAS,
        _type: 'digitalocean_account_has_container_registry',
      },
    ],
    mappedRelationships: [],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
];
