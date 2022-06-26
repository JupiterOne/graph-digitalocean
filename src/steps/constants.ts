import { StepEntityMetadata } from '@jupiterone/integration-sdk-core';

export const Steps = {
  ACCOUNT: 'fetch-account',
  DROPLETS: 'fetch-droplets',
  PROJECTS: 'fetch-projects',
};

export const Entities: Record<
  'ACCOUNT' | 'DROPLET' | 'PROJECT',
  StepEntityMetadata
> = {
  ACCOUNT: {
    resourceName: 'Account',
    _type: 'digitalocean_account',
    _class: ['Account'],
    schema: {
      properties: {
        email: { type: 'string' },
        emailVerified: { type: 'boolean' },
        status: { type: 'string' },
        statusMessage: {
          type: 'string',
        },
        dropletLimit: {
          type: 'number',
        },
        floatingIpLimit: {
          type: 'number',
        },
        reservedIpLimit: {
          type: 'number',
        },
        volumeLimit: {
          type: 'number',
        },
      },
      required: [
        'email',
        'emailVerified',
        'status',
        'statusMessage',
        'dropletLimit',
        'floatingIpLimit',
        'reservedIpLimit',
        'volumeLimit',
      ],
    },
  },
  DROPLET: {
    resourceName: 'Droplet',
    _type: 'digitalocean_droplet',
    _class: ['Host'],
  },
  PROJECT: {
    resourceName: 'Project',
    _type: 'digitalocean_project',
    _class: ['Project'],
  },
};

//export const Relationships: Record<'', StepRelationshipMetadata> = {};
