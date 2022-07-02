export interface DigitalOceanCertificate {
  id: string;
  name: string;
  not_after: Date;
  sha1_fingerprint: string;
  created_at: Date;
  dns_names: string[];
  state: string;
  type: string;
}
