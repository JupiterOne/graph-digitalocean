import { createIntegrationEntity } from '@jupiterone/integration-sdk-core';
import { DigitalOceanSSHKey } from '../../types/sshKeyType';
import { createEntityKey, Entities } from '../constants';

export function createSSHKeyEntity(sshKey: DigitalOceanSSHKey) {
  return createIntegrationEntity({
    entityData: {
      source: sshKey,
      assign: {
        _key: createEntityKey(Entities.SSH_KEY, sshKey.id),
        _type: Entities.SSH_KEY._type,
        _class: Entities.SSH_KEY._class,
        id: sshKey.id.toString(),
        name: sshKey.name,
        displayName: sshKey.name,
        fingerprint: sshKey.fingerprint,
        // TODO: add sshKey.public_key ??
      },
    },
  });
}
