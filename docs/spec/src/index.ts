import { IntegrationSpecConfig } from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../../src/config';
import { accountSpec } from './account';
import { domainSpec } from './domains';
import { dropletsSpec } from './droplets';
import { projectSpec } from './projects';
import { volumeSpec } from './volumes';

export const invocationConfig: IntegrationSpecConfig<IntegrationConfig> = {
  integrationSteps: [
    ...accountSpec,
    ...dropletsSpec,
    ...projectSpec,
    ...volumeSpec,
    ...domainSpec,
  ],
};
