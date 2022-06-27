export interface DigitalOceanDomain {
  name: string;
  ttl: number;
  zone_file: string;
}

export interface DigitalOceanDomainRecord {
  id: number;
  type: string;
  name: string;
  data: string;
  priority: number;
  port: number;
  ttl: number;
  weight: number;
  flags: string[];
  tag: string;
}
