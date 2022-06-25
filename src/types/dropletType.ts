export interface DigitalOceanDroplet {
  id: number;
  name: string;
  memory: number;
  vcpus: number;
  disk: number;
  locked: boolean;
  status: string;
  kernel: null;
  created_at: Date;
  features: string[];
  backup_ids: number[];
  next_backup_window: NextBackupWindow;
  snapshot_ids: number[];
  image: Image;
  volume_ids: string[];
  size: Size;
  size_slug: string;
  networks: Networks;
  region: Region;
  tags: string[];
  vpc_uuid: string;
}

export interface Image {
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
  tags: any[];
  status: string;
  error_message: string;
}

export interface Networks {
  v4: V4[];
  v6: V6[];
}

export interface V4 {
  ip_address: string;
  netmask: string;
  gateway: string;
  type: string;
}

export interface V6 {
  ip_address: string;
  netmask: number;
  gateway: string;
  type: string;
}

export interface NextBackupWindow {
  start: Date;
  end: Date;
}

export interface Region {
  name: string;
  slug: string;
  features: string[];
  available: boolean;
  sizes: string[];
}

export interface Size {
  slug: string;
  memory: number;
  vcpus: number;
  disk: number;
  transfer: number;
  price_monthly: number;
  price_hourly: number;
  regions: string[];
  available: boolean;
  description: string;
}
