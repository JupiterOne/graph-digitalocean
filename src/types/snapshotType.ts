export interface DigitalOceanSnapshot {
  id: string;
  name: string;
  created_at: Date;
  regions: string[];
  resource_id: string;
  resource_type: 'droplet' | 'volume';
  min_disk_size: number;
  size_gigabytes: number;
  tags: string[];
}
