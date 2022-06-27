import { createIntegrationEntity } from '@jupiterone/integration-sdk-core';
import { DigitalOceanReservedIP } from '../../types/ipType';
import { Entities } from '../constants';

export function createReservedIpEntity(reservedIp: DigitalOceanReservedIP) {
  return createIntegrationEntity({
    entityData: {
      source: reservedIp,
      assign: {
        _key: reservedIp.ip,
        _class: Entities.RESERVED_IP._class,
        _type: Entities.RESERVED_IP._type,
        name: reservedIp.ip,
        displayName: reservedIp.ip,
        ipAddress: reservedIp.ip,
        dropletId: reservedIp.droplet?.id,

        locked: reservedIp.locked,
      },
    },
  });
}
