import {
  createDirectRelationship,
  Entity,
  IntegrationMissingKeyError,
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { ACCOUNT_ENTITY_KEY } from '../account';
import { Entities, Relationships, Steps } from '../constants';
import { createSSHKeyEntity } from './converter';

export const sshKeySteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.SSH_KEYS,
    name: 'Fetch SSH Keys',
    entities: [Entities.SSH_KEY],
    relationships: [Relationships.ACCOUNT_HAS_SSH_KEY],
    dependsOn: [Steps.ACCOUNT],
    executionHandler: fetchSSHKeys,
  },
];

export async function fetchSSHKeys({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const client = createAPIClient(instance.config);

  const accountEntity = await jobState.getData<Entity>(ACCOUNT_ENTITY_KEY);
  if (!accountEntity) {
    throw new IntegrationMissingKeyError('Account entity not found');
  }

  await client.iterateSSHKeys(async (sshKey) => {
    const keyEntity = await jobState.addEntity(createSSHKeyEntity(sshKey));
    await jobState.addRelationship(
      createDirectRelationship({
        _class: Relationships.ACCOUNT_HAS_SSH_KEY._class,
        from: accountEntity,
        to: keyEntity,
      }),
    );
  });
}
