export type DataKey =
  | 'droplets'
  | 'snapshots'
  | 'projects'
  | 'resources'
  | 'volumes'
  | 'domains'
  | 'domain_records'
  | 'reserved_ips'
  | 'ssh_keys'
  | 'certificates'
  | 'policies'
  | 'databases'
  | 'images'
  | 'kubernetes_clusters'
  | 'registry'
  | 'firewalls'
  | 'backups';

export type PaginatedResponse<K extends DataKey, T> = {
  [key in K]: T[];
} & {
  links?: {
    pages?: {
      first?: string;
      prev?: string;
      next?: string;
      last?: string;
    };
  };
  meta?: {
    total: number;
  };
};
