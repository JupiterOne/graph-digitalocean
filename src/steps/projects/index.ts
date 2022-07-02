import {
  createDirectRelationship,
  Entity,
  IntegrationMissingKeyError,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { ACCOUNT_ENTITY_KEY } from '../account';
import { Entities, Relationships, Steps } from '../constants';
import { createDropletKey } from '../droplets/converter';
import { createProjectEntity } from './converter';

export const projectSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.PROJECTS,
    name: 'Fetch Projects',
    entities: [Entities.PROJECT],
    relationships: [Relationships.ACCOUNT_HAS_PROJECT],
    dependsOn: [Steps.ACCOUNT],
    executionHandler: fetchProjects,
  },
  {
    id: Steps.PROJECT_RESOURCES,
    name: 'Fetch Project Resources',
    entities: [],
    relationships: [
      Relationships.PROJECT_HAS_DROPLET,
      Relationships.PROJECT_HAS_DATABASE,
    ],
    dependsOn: [Steps.PROJECTS, Steps.DROPLETS, Steps.DATABASES],
    executionHandler: fetchProjectResources,
  },
];

export async function fetchProjects({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const client = createAPIClient(instance.config);

  const accountEntity = await jobState.getData<Entity>(ACCOUNT_ENTITY_KEY);

  if (!accountEntity) {
    throw new IntegrationMissingKeyError('Account entity not found');
  }

  await client.iterateProjects(async (project) => {
    const projectEntity = await jobState.addEntity(
      createProjectEntity(project),
    );

    await jobState.addRelationship(
      createDirectRelationship({
        _class: RelationshipClass.HAS,
        from: accountEntity,
        to: projectEntity,
      }),
    );
  });
}

// TODO: not using properties from response
export async function fetchProjectResources({
  instance,
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const client = createAPIClient(instance.config);
  await jobState.iterateEntities(
    { _type: Entities.PROJECT._type },
    async (projectEntity) => {
      await client.iterateProjectResources(
        projectEntity.id as string,
        async (resource) => {
          const [resourceType, key] = getResourceType(resource.urn);
          if (resourceType === 'droplet') {
            const dropletEntity = await jobState.findEntity(
              createDropletKey(key),
            );

            if (!dropletEntity) {
              throw new IntegrationMissingKeyError(
                `Droplet entity not found: ${key}`,
              );
            }

            await jobState.addRelationship(
              createDirectRelationship({
                from: projectEntity,
                to: dropletEntity,
                _class: Relationships.PROJECT_HAS_DROPLET._class,
              }),
            );
          } else if (resourceType === 'dbaas') {
            const databaseEntity = await jobState.findEntity(key);

            if (!databaseEntity) {
              throw new IntegrationMissingKeyError(
                `Database entity not found: ${key}`,
              );
            }

            await jobState.addRelationship(
              createDirectRelationship({
                from: projectEntity,
                to: databaseEntity,
                _class: Relationships.PROJECT_HAS_DATABASE._class,
              }),
            );
          } else {
            logger.warn(`Unhandled resource type: ${resourceType}`);
          }
        },
      );
    },
  );
}

// There may be other resource types
type ResourceType =
  | 'app'
  | 'dbaas'
  | 'domain'
  | 'droplet'
  | 'floating_ip'
  | 'kubernetes'
  | 'load_balancer'
  | 'space'
  | 'volume';

function getResourceType(urn: string): [ResourceType, string] {
  const parts = urn.split(':');
  return [parts[1] as ResourceType, parts[2]];
}
