export interface DigitalOceanContainerRegistry {
  name: string;
  created_at: Date;
  region: string;
  storage_usage_bytes: number;
  storage_usage_bytes_updated_at: Date;
  subscription: Subscription;
}

export interface Subscription {
  tier: Tier;
  created_at: Date;
  updated_at: Date;
}

export interface Tier {
  name: string;
  slug: string;
  included_repositories: number;
  included_storage_bytes: number;
  allow_storage_overage: boolean;
  included_bandwidth_bytes: number;
  monthly_price_in_cents: number;
  storage_overage_price_in_cents: number;
}
