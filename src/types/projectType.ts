export interface DigitalOceanProject {
  id: string;
  owner_uuid: string;
  owner_id: number;
  name: string;
  description: string;
  purpose: string;
  environment: string;
  is_default: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface DigitalOceanProjectResources {
  urn: string;
  assigned_at: string;
  links: {
    self: string;
  };
  status: string;
}
