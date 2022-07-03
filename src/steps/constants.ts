import {
  RelationshipClass,
  RelationshipDirection,
  StepEntityMetadata,
  StepMappedRelationshipMetadata,
  StepRelationshipMetadata,
} from '@jupiterone/integration-sdk-core';

export const Steps = {
  ACCOUNT: 'fetch-account',
  DROPLETS: 'fetch-droplets',
  PROJECTS: 'fetch-projects',
  PROJECT_RESOURCES: 'fetch-project-resources',
  VOLUMES: 'fetch-volumes',
  DOMAINS: 'fetch-domains',
  DOMAIN_RECORDS: 'fetch-domain-records',
  DATABASES: 'fetch-databases',
  SNAPSHOTS: 'fetch-snapshots',
  DATABASE_CERTIFICATES: 'fetch-database-certificates',
  DATABASE_BACKUPS: 'fetch-database-backups',
  RESERVED_IPS: 'fetch-reserved-ips',
  SSH_KEYS: 'fetch-keys',
  FIREWALLS: 'fetch-firewalls',
  ALERT_POLICIES: 'fetch-alert-policies',
  REGIONS: 'fetch-regions',
  CERTIFICATES: 'fetch-certificates',
  CONTAINER_REGISTRIES: 'fetch-container-registries',
  BUILD_VOLUME_DROPLET_RELATIONSHIPS: 'build-volume-droplet-relationships',
};

type EntityIds =
  | 'ACCOUNT'
  | 'DROPLET'
  | 'PROJECT'
  | 'VOLUME'
  | 'DOMAIN'
  | 'DOMAIN_RECORD'
  | 'RESERVED_IP'
  | 'DATABASE'
  | 'DATABASE_CERTIFICATE'
  | 'DATABASE_BACKUP'
  | 'SSH_KEY'
  | 'IMAGE'
  | 'DROPLET_SNAPSHOT'
  | 'VOLUME_SNAPSHOT'
  | 'REGION'
  | 'ALERT_POLICY'
  | 'CERTIFICATE'
  | 'CONTAINER_REGISTRY'
  | 'FIREWALL';

export const Entities: Record<EntityIds, StepEntityMetadata> = {
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
  VOLUME: {
    resourceName: 'Volume',
    _type: 'digitalocean_volume',
    _class: ['DataStore', 'Disk'],
  },
  DOMAIN: {
    resourceName: 'Domain',
    _type: 'digitalocean_domain',
    _class: ['Domain'],
  },
  DOMAIN_RECORD: {
    resourceName: 'Domain Record',
    _type: 'digitalocean_domain_record',
    _class: ['DomainRecord'],
  },
  RESERVED_IP: {
    resourceName: 'Reserved IP',
    _type: 'digitalocean_reserved_ip',
    _class: ['IpAddress'],
  },
  SSH_KEY: {
    resourceName: 'SSH Key',
    _type: 'digitalocean_ssh_key',
    _class: ['Key', 'AccessKey'],
  },
  DATABASE: {
    resourceName: 'Database',
    _type: 'digitalocean_database',
    _class: ['Database'],
  },
  DATABASE_CERTIFICATE: {
    resourceName: 'Database Certificate',
    _type: 'digitalocean_database_certificate',
    _class: ['Certificate'],
  },
  DATABASE_BACKUP: {
    resourceName: 'Database Backup',
    _type: 'digitalocean_database_backup',
    _class: ['Backup'],
  },
  IMAGE: {
    resourceName: 'Image',
    _type: 'digitalocean_image',
    _class: ['Image'],
  },
  DROPLET_SNAPSHOT: {
    resourceName: 'Droplet Snapshot',
    _type: 'digitalocean_droplet_snapshot',
    _class: ['Image'],
  },
  VOLUME_SNAPSHOT: {
    resourceName: 'Volume Snapshot',
    _type: 'digitalocean_volume_snapshot',
    _class: ['Image'],
  },
  FIREWALL: {
    resourceName: 'Firewall',
    _type: 'digitalocean_firewall',
    _class: ['Firewall'],
  },
  ALERT_POLICY: {
    resourceName: 'Alert Policy',
    _type: 'digitalocean_alert_policy',
    _class: ['Rule'],
  },
  REGION: {
    resourceName: 'Region',
    _type: 'digitalocean_region',
    _class: ['Site'],
  },
  CERTIFICATE: {
    resourceName: 'Certificate',
    _type: 'digitalocean_certificate',
    _class: ['Certificate'],
  },
  CONTAINER_REGISTRY: {
    resourceName: 'Container Registry',
    _type: 'digitalocean_container_registry',
    _class: ['Repository'],
  },
};

export const Relationships: Record<
  | 'DROPLET_USES_VOLUME'
  | 'ACCOUNT_HAS_PROJECT'
  | 'ACCOUNT_HAS_SSH_KEY'
  | 'DROPLET_USES_RESERVED_IP'
  | 'DROPLET_HAS_SNAPSHOT'
  | 'VOLUME_HAS_SNAPSHOT'
  | 'PROJECT_HAS_DROPLET'
  | 'PROJECT_HAS_DATABASE'
  | 'PROJECT_HAS_VOLUME'
  | 'DOMAIN_HAS_DOMAIN_RECORD'
  | 'DATABASE_HAS_BACKUP'
  | 'DROPLET_HAS_ALERT_POLICY'
  | 'REGION_HOSTS_DROPLET'
  | 'REGION_HOSTS_RESERVED_IP'
  | 'REGION_HOSTS_VOLUME',
  StepRelationshipMetadata
> = {
  DROPLET_USES_VOLUME: {
    sourceType: Entities.DROPLET._type,
    targetType: Entities.VOLUME._type,
    _type: 'digitalocean_droplet_uses_volume',
    _class: RelationshipClass.USES,
  },
  ACCOUNT_HAS_PROJECT: {
    sourceType: Entities.ACCOUNT._type,
    targetType: Entities.PROJECT._type,
    _type: 'digitalocean_account_has_project',
    _class: RelationshipClass.HAS,
  },
  // TODO: Consider a different relationship class for this
  // It's more common to see ACCESS_KEY_ALLOWS_ACCOUNT
  // But I'm not 100% sure that's the correct relationship class for this case
  ACCOUNT_HAS_SSH_KEY: {
    sourceType: Entities.ACCOUNT._type,
    targetType: Entities.SSH_KEY._type,
    _type: 'digitalocean_account_has_ssh_key',
    _class: RelationshipClass.HAS,
  },
  DROPLET_USES_RESERVED_IP: {
    sourceType: Entities.DROPLET._type,
    targetType: Entities.RESERVED_IP._type,
    _type: 'digitalocean_droplet_uses_reserved_ip',
    _class: RelationshipClass.USES,
  },
  DROPLET_HAS_SNAPSHOT: {
    sourceType: Entities.DROPLET._type,
    targetType: Entities.DROPLET_SNAPSHOT._type,
    _type: 'digitalocean_droplet_has_snapshot',
    _class: RelationshipClass.HAS,
  },
  DROPLET_HAS_ALERT_POLICY: {
    sourceType: Entities.DROPLET._type,
    targetType: Entities.ALERT_POLICY._type,
    _type: 'digitalocean_droplet_has_alert_policy',
    _class: RelationshipClass.HAS,
  },
  VOLUME_HAS_SNAPSHOT: {
    sourceType: Entities.VOLUME._type,
    targetType: Entities.VOLUME_SNAPSHOT._type,
    _type: 'digitalocean_volume_has_snapshot',
    _class: RelationshipClass.HAS,
  },
  PROJECT_HAS_DROPLET: {
    sourceType: Entities.PROJECT._type,
    targetType: Entities.DROPLET._type,
    _type: 'digitalocean_project_has_droplet',
    _class: RelationshipClass.HAS,
  },
  PROJECT_HAS_DATABASE: {
    sourceType: Entities.PROJECT._type,
    targetType: Entities.DATABASE._type,
    _type: 'digitalocean_project_has_database',
    _class: RelationshipClass.HAS,
  },
  DOMAIN_HAS_DOMAIN_RECORD: {
    sourceType: Entities.DOMAIN._type,
    targetType: Entities.DOMAIN_RECORD._type,
    _type: 'digitalocean_domain_has_domain_record',
    _class: RelationshipClass.HAS,
  },
  DATABASE_HAS_BACKUP: {
    sourceType: Entities.DATABASE._type,
    targetType: Entities.DATABASE_BACKUP._type,
    _type: 'digitalocean_database_has_backup',
    _class: RelationshipClass.HAS,
  },
  REGION_HOSTS_DROPLET: {
    sourceType: Entities.REGION._type,
    targetType: Entities.DROPLET._type,
    _type: 'digitalocean_region_hosts_droplet',
    _class: RelationshipClass.HOSTS,
  },
  REGION_HOSTS_RESERVED_IP: {
    sourceType: Entities.REGION._type,
    targetType: Entities.RESERVED_IP._type,
    _type: 'digitalocean_region_hosts_reserved_ip',
    _class: RelationshipClass.HOSTS,
  },
  REGION_HOSTS_VOLUME: {
    sourceType: Entities.REGION._type,
    targetType: Entities.VOLUME._type,
    _type: 'digitalocean_region_hosts_volume',
    _class: RelationshipClass.HOSTS,
  },
  PROJECT_HAS_VOLUME: {
    sourceType: Entities.PROJECT._type,
    targetType: Entities.VOLUME._type,
    _type: 'digitalocean_project_has_volume',
    _class: RelationshipClass.HAS,
  },
};

export const TargetEntities: Record<string, StepEntityMetadata> = {
  SLACK_CHANNEL: {
    resourceName: 'Slack Channel',
    _type: 'slack_channel',
    _class: ['Channel'],
  },
};

export const MappedRelationships: Record<
  'ALERT_POLICY_NOTIFIES_SLACK_CHANNEL',
  StepMappedRelationshipMetadata
> = {
  ALERT_POLICY_NOTIFIES_SLACK_CHANNEL: {
    sourceType: Entities.ALERT_POLICY._type,
    targetType: TargetEntities.SLACK_CHANNEL._type,
    _class: RelationshipClass.NOTIFIES,
    _type: 'digitalocean_alert_policy_notifies_slack_team',
    direction: RelationshipDirection.FORWARD,
  },
};

/*
TODO: Create function for generating types for each entity
export function createEntityKey(entityType: string, keyValue: string): string {
}
*/
