export interface DigitalOceanImage {
  id: number;
  name: string;
  distribution: string;
  slug: string;
  public: boolean;
  regions: string[];
  created_at: Date;
  type: string;
  min_disk_size: number;
  size_gigabytes: number;
  description: string;
  tags: string[];
  status: string;
  error_message: string;
}
