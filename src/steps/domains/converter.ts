import { createIntegrationEntity } from '@jupiterone/integration-sdk-core';
import { DigitalOceanDomain } from '../../types/domainType';
import { Entities } from '../constants';

function createDomainKey(domain: DigitalOceanDomain) {
  return 'digitalocean_domain' + domain.name;
}

export function createDomainEntity(domain: DigitalOceanDomain) {
  return createIntegrationEntity({
    entityData: {
      source: domain,
      assign: {
        _key: createDomainKey(domain),
        _class: Entities.DOMAIN._class,
        _type: Entities.DOMAIN._type,
        name: domain.name,
        displayName: domain.name,
        domainName: domain.name,
        timeToLive: domain.ttl,
      },
    },
  });
}
