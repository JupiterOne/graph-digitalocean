import { StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const kubernetesSpec: StepSpec<IntegrationConfig>[] = [
  {
    id: 'fetch-kubernetes-clusters',
    name: 'Fetch Kubernetes Clusters',
    entities: [
      {
        resourceName: 'Kubernetes Cluster',
        _type: 'digitalocean_kubernetes_cluster',
        _class: ['Cluster'],
      },
    ],
    relationships: [],
    mappedRelationships: [],
    dependsOn: [],
    implemented: true,
  },
];
