import {
  createIntegrationEntity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';
import { DigitalOceanProject } from '../../types/projectType';
import { Entities } from '../constants';

export function createProjectEntity(project: DigitalOceanProject) {
  return createIntegrationEntity({
    entityData: {
      source: project,
      assign: {
        _key: project.id,
        _type: Entities.PROJECT._type,
        _class: Entities.PROJECT._class,
        name: project.name,
        description: project.description,
        createdOn: parseTimePropertyValue(project.created_at),
        updatedOn: parseTimePropertyValue(project.updated_at),

        id: project.id,
        ownerUuid: project.owner_uuid,
        ownerId: project.owner_id,
        environment: project.environment,
        defaultProject: project.is_default,
        purpose: project.purpose,
      },
    },
  });
}
