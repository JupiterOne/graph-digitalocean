import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const projectSpec: StepSpec<IntegrationConfig>[] = [
  {
    id: 'fetch-projects',
    name: 'Fetch Projects',
    entities: [
      {
        resourceName: 'Project',
        _type: 'digitalocean_project',
        _class: ['Project'],
      },
    ],
    relationships: [
      {
        _class: RelationshipClass.HAS,
        _type: 'digitalocean_account_has_project',
        sourceType: 'digitalocean_account',
        targetType: 'digitalocean_project',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
  {
    id: 'fetch-project-resources',
    name: 'Fetch Project Resources',
    entities: [],
    relationships: [
      {
        _class: RelationshipClass.HAS,
        _type: 'digitalocean_project_has_droplet',
        sourceType: 'digitalocean_project',
        targetType: 'digitalocean_droplet',
      },
      {
        _class: RelationshipClass.HAS,
        _type: 'digitalocean_project_has_database',
        sourceType: 'digitalocean_project',
        targetType: 'digitalocean_database',
      },
      {
        _class: RelationshipClass.HAS,
        _type: 'digitalocean_project_has_volume',
        sourceType: 'digitalocean_project',
        targetType: 'digitalocean_volume',
      },
      {
        sourceType: 'digitalocean_project',
        targetType: 'digitalocean_reserved_ip',
        _type: 'digitalocean_project_has_reserved_ip',
        _class: RelationshipClass.HAS,
      },
      {
        sourceType: 'digitalocean_project',
        targetType: 'digitalocean_kubernetes_cluster',
        _type: 'digitalocean_project_has_kubernetes_cluster',
        _class: RelationshipClass.HAS,
      },
      {
        sourceType: 'digitalocean_project',
        targetType: 'digitalocean_domain',
        _type: 'digitalocean_project_has_domain',
        _class: RelationshipClass.HAS,
      },
    ],
    dependsOn: [
      'fetch-projects',
      'fetch-droplets',
      'fetch-databases',
      'fetch-reserved-ips',
      'fetch-kubernetes-clusters',
      'fetch-domains',
    ],
    implemented: true,
  },
];
