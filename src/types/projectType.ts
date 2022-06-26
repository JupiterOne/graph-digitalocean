export interface DigitalOceanProject {
  id: string;
  owner_uuid: string;
  owner_id: number;
  name: string;
  description: string;
  purpose: string;
  environment: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}
