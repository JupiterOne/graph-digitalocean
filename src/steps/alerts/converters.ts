import { createIntegrationEntity } from '@jupiterone/integration-sdk-core';
import { DigitalOceanAlertPolciy } from '../../types/alertPolicy';
import { Entities } from '../constants';

// TODO: add alerts to users and slack?
export function createAlertPolicyEntity(alertPolicy: DigitalOceanAlertPolciy) {
  return createIntegrationEntity({
    entityData: {
      source: {
        ...alertPolicy,
        tags: undefined,
      },
      assign: {
        _key: alertPolicy.uuid,
        _class: Entities.ALERT_POLICY._class,
        _type: Entities.ALERT_POLICY._type,
        name: alertPolicy.description,
        displayName: alertPolicy.description,
        enabled: alertPolicy.enabled,
        type: alertPolicy.type,
        id: alertPolicy.uuid,
        uuid: alertPolicy.uuid,
        compare: alertPolicy.compare,
        value: alertPolicy.value,
        window: alertPolicy.window,
      },
    },
  });
}
