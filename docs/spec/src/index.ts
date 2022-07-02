import { IntegrationSpecConfig } from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../../src/config';
import { accountSpec } from './account';
import { alertPolicySpec } from './alertPolciy';
import { databaseSpec } from './databases';
import { domainSpec } from './domains';
import { dropletsSpec } from './droplets';
import { firewallSpec } from './firewall';
import { ipSpec } from './ip';
import { projectSpec } from './projects';
import { snapshotSpec } from './snapshots';
import { volumeSpec } from './volumes';

export const invocationConfig: IntegrationSpecConfig<IntegrationConfig> = {
  integrationSteps: [
    ...accountSpec,
    ...dropletsSpec,
    ...projectSpec,
    ...volumeSpec,
    ...domainSpec,
    ...ipSpec,
    ...databaseSpec,
    ...snapshotSpec,
    ...firewallSpec,
    ...alertPolicySpec,
  ],
};
