export type DataKey =
  | 'droplets'
  | 'projects'
  | 'volumes'
  | 'domains'
  | 'domain_records'
  | 'floating_ips';

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
