import { StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const domainSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: n/a
     * PATTERN: iterateResources
     */
    id: 'fetch-domains',
    name: 'Fetch Domains',
    entities: [
      {
        resourceName: 'Domain',
        _type: 'digitalocean_domain',
        _class: ['Domain'],
      },
    ],
    relationships: [],
    dependsOn: [],
    implemented: true,
  },
];
