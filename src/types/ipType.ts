import { DigitalOceanRegion } from './regionType';
import { DigitalOceanDroplet } from './dropletType';

export interface DigitalOceanReservedIP {
  ip: string;
  droplet: null | DigitalOceanDroplet;
  region: DigitalOceanRegion;
  locked: boolean;
}
