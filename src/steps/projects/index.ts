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
import { createProjectEntity } from './converter';
import { createProjectEntityRelationship, getResourceType } from './util';

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
      Relationships.PROJECT_HAS_VOLUME,
      Relationships.PROJECT_HAS_RESERVED_IP,
      Relationships.PROJECT_HAS_KUBERNETES_CLUSTER,
    ],
    dependsOn: [
      Steps.PROJECTS,
      Steps.DROPLETS,
      Steps.DATABASES,
      Steps.RESERVED_IPS,
      Steps.KUBERNETES_CLUSTER,
    ],
    executionHandler: fetchProjectResources,
  },
];

async function fetchProjects({
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
async function fetchProjectResources({
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
          await createProjectEntityRelationship(
            jobState,
            logger,
            projectEntity,
            resourceType,
            key,
          );
        },
      );
    },
  );
}
