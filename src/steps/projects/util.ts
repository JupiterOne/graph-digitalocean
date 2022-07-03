import {
  createDirectRelationship,
  Entity,
  IntegrationLogger,
  IntegrationMissingKeyError,
  JobState,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';
import { createEntityKey, Entities } from '../constants';

type ResourceType =
  | 'app'
  | 'dbaas'
  | 'domain'
  | 'droplet'
  | 'floatingip'
  | 'kubernetes'
  | 'load_balancer'
  | 'space'
  | 'volume';

// There may be other resource types
export function getResourceType(urn: string): [ResourceType, string] {
  const parts = urn.split(':');
  return [parts[1] as ResourceType, parts[2]];
}

export async function createProjectEntityRelationship(
  jobState: JobState,
  logger: IntegrationLogger,
  projectEntity: Entity,
  resourceType: ResourceType,
  key: string,
) {
  let entityKey: string | undefined;
  if (resourceType === 'droplet') {
    entityKey = createEntityKey(Entities.DROPLET, key);
  } else if (resourceType === 'dbaas') {
    entityKey = createEntityKey(Entities.DATABASE, key);
  } else if (resourceType === 'volume') {
    entityKey = createEntityKey(Entities.VOLUME, key);
  } else if (resourceType === 'floatingip') {
    entityKey = createEntityKey(Entities.RESERVED_IP, key);
  } else if (resourceType === 'kubernetes') {
    entityKey = createEntityKey(Entities.KUBERNETES_CLUSTER, key);
  } else {
    logger.warn(`Unhandled resource type: ${resourceType}`);
    entityKey = undefined;
    return;
  }

  const entity = await jobState.findEntity(entityKey);
  if (!entity) {
    throw new IntegrationMissingKeyError(
      `Entity not found: ${resourceType}, ${entityKey}`,
    );
  }

  await jobState.addRelationship(
    createDirectRelationship({
      from: projectEntity,
      to: entity,
      _class: RelationshipClass.HAS,
    }),
  );
}
