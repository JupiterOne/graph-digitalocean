import { DigitalOceanDroplet } from './dropletType';

export interface DigitalOceanReservedIP {
  ip: string;
  droplet: null | DigitalOceanDroplet;
  region: Region;
  locked: boolean;
}

export interface Region {
  name: string;
  slug: string;
  features: string[];
  available: boolean;
  sizes: string[];
}
