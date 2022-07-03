import { createIntegrationEntity } from '@jupiterone/integration-sdk-core';
import {
  DigitalOceanDomain,
  DigitalOceanDomainRecord,
} from '../../types/domainType';
import { createEntityKey, Entities } from '../constants';

export function createDomainEntity(domain: DigitalOceanDomain) {
  return createIntegrationEntity({
    entityData: {
      source: domain,
      assign: {
        _key: createEntityKey(Entities.DOMAIN, domain.name),
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
        _key: createEntityKey(Entities.DOMAIN_RECORD, domainRecord.id),
        _type: Entities.DOMAIN_RECORD._type,
        _class: Entities.DOMAIN_RECORD._class,
        id: domainRecord.id.toString(),
        name: domainRecord.name,
        displayName: domainRecord.type + domainRecord.name + domainRecord.data,
        description: domainRecord.type,
        TTL: domainRecord.ttl,
        value: domainRecord.data,
      },
    },
  });
}
