import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const databaseSpec: StepSpec<IntegrationConfig>[] = [
  {
    id: 'fetch-databases',
    name: 'Fetch Databases',
    entities: [
      {
        resourceName: 'Database',
        _type: 'digitalocean_database',
        _class: ['Database'],
      },
    ],
    relationships: [],
    mappedRelationships: [],
    dependsOn: [],
    implemented: true,
  },
  {
    id: 'fetch-database-certificates',
    name: 'Fetch Database Certificates',
    entities: [
      {
        resourceName: 'Database Certificate',
        _type: 'digitalocean_database_certificate',
        _class: ['Certificate'],
      },
    ],
    relationships: [],
    dependsOn: ['fetch-databases'],
    implemented: true,
  },
  {
    id: 'fetch-database-backups',
    name: 'Fetch Database Backups',
    entities: [
      {
        resourceName: 'Database Backup',
        _type: 'digitalocean_database_backup',
        _class: ['Backup'],
      },
    ],
    relationships: [
      {
        sourceType: 'digitalocean_database',
        targetType: 'digitalocean_database_backup',
        _type: 'digitalocean_database_has_backup',
        _class: RelationshipClass.HAS,
      },
    ],
    dependsOn: ['fetch-databases'],
    implemented: true,
  },
];
