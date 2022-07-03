import { createIntegrationEntity } from '@jupiterone/integration-sdk-core';
import { DigitalOceanKubernetesCluster } from '../../types/kubernetesType';
import { createEntityKey, Entities } from '../constants';

// TODO add more props
export function createClusterEntity(cluster: DigitalOceanKubernetesCluster) {
  return createIntegrationEntity({
    entityData: {
      source: {
        ...cluster,
        tags: undefined,
      },
      assign: {
        _key: createEntityKey(Entities.KUBERNETES_CLUSTER, cluster.id),
        _class: Entities.KUBERNETES_CLUSTER._class,
        _type: Entities.KUBERNETES_CLUSTER._type,
        name: cluster.name,
        displayName: cluster.name,
      },
    },
  });
}
