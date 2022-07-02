import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';
import { DigitalOceanCertificate } from '../../types/certificateType';
import { Entities } from '../constants';

export function createCertificateEntity(cert: DigitalOceanCertificate): Entity {
  return createIntegrationEntity({
    entityData: {
      source: cert,
      assign: {
        _key: cert.id,
        _class: Entities.CERTIFICATE._class,
        _type: Entities.CERTIFICATE._type,
        name: cert.name,
        displayName: cert.name,
        createdOn: parseTimePropertyValue(cert.created_at),
        expiresOn: parseTimePropertyValue(cert.not_after),
        sha1: cert.sha1_fingerprint,
        state: cert.state,
        type: cert.type,
      },
    },
  });
}
