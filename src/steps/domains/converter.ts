import { createIntegrationEntity } from '@jupiterone/integration-sdk-core';
import {
  DigitalOceanDomain,
  DigitalOceanDomainRecord,
} from '../../types/domainType';
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

export function createDomainRecordEntity(
  domainRecord: DigitalOceanDomainRecord,
) {
  return createIntegrationEntity({
    entityData: {
      source: domainRecord,
      assign: {
        _key: 'digitalocean_domain_record' + domainRecord.id.toString(),
        _type: Entities.DOMAIN_RECORD._type,
        _class: Entities.DOMAIN_RECORD._class,
        name: domainRecord.name,
        displayName: domainRecord.type + domainRecord.name + domainRecord.data,
        description: domainRecord.type,
        TTL: domainRecord.ttl,
        value: domainRecord.data,
      },
    },
  });
}
