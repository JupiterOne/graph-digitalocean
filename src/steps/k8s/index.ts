import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { Entities, Steps } from '../constants';
import { createClusterEntity } from './converters';

export const kubernetesSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.KUBERNETES_CLUSTER,
    name: 'Fetch Kubernetes Clusters',
    entities: [Entities.KUBERNETES_CLUSTER],
    relationships: [],
    mappedRelationships: [],
    dependsOn: [],
    executionHandler: fetchKubernetesClusters,
  },
];

async function fetchKubernetesClusters({
  instance,
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const client = createAPIClient(instance.config);
  await client.iterateKubernetesClusters(async (cluster) => {
    await jobState.addEntity(createClusterEntity(cluster));
  });
}
