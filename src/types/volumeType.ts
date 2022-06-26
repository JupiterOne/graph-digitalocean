export interface DigitalOceanVolume {
  id: string;
  region: {
    name: string;
    slug: string;
    sizes: string[];
    features: string[];
    available: boolean;
  };
  droplet_ids: string[];
  name: string;
  description: string;
  size_gigabytes: number;
  created_at: string;
  filesystem_type: string;
  filesystem_label: string;
  tags: string[];
}
