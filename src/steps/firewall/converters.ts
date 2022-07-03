import {
  createIntegrationEntity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';
import { DigitalOceanFirewall } from '../../types/firewallType';
import { createEntityKey, Entities } from '../constants';

// TODO: remove rules from rawdata
export function createFirewallEntity(firewall: DigitalOceanFirewall) {
  return createIntegrationEntity({
    entityData: {
      source: {
        firewall,
        tags: [],
      },
      assign: {
        _key: createEntityKey(Entities.FIREWALL, firewall.id),
        _type: Entities.FIREWALL._type,
        _class: Entities.FIREWALL._class,
        name: firewall.name,
        displayName: firewall.name,
        createdOn: parseTimePropertyValue(firewall.created_at),
        dropletIds: firewall.droplet_ids,
        status: firewall.status,
        // TODO: check this is the right category
        category: ['host'],
      },
    },
  });
}
