import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';
import { DigitalOceanAccount } from '../../types';

import { Entities } from '../constants';

export function createAccountEntity(account: DigitalOceanAccount): Entity {
  return createIntegrationEntity({
    entityData: {
      source: account,
      assign: {
        _key: account.uuid,
        _type: Entities.ACCOUNT._type,
        _class: Entities.ACCOUNT._class,
        // DigitalOcean Account?
        name: account.email,
        email: account.email,
        emailVerified: account.email_verified,
        status: account.status,
        statusMessage: account.status_message,
        dropletLimit: account.droplet_limit,
        floatingIpLimit: account.floating_ip_limit,
        reservedIpLimit: account.reserved_ip_limit,
        volumeLimit: account.volume_limit,
      },
    },
  });
}
