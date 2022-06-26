export type DataKey = 'droplets' | 'projects' | 'volumes';

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
