export interface DigitalOceanDatabase {
  id: string;
  name: string;
  engine: string;
  version: string;
  connection: Connection;
  private_connection: Connection;
  users: User[];
  db_names: string[];
  num_nodes: number;
  region: string;
  status: string;
  created_at: Date;
  maintenance_window: MaintenanceWindow;
  size: string;
  tags: string[];
  private_network_uuid: string;
}

export interface Connection {
  uri: string;
  database: string;
  host: string;
  port: number;
  user: string;
  password: string;
  ssl: boolean;
}

export interface MaintenanceWindow {
  day: string;
  hour: string;
  pending: boolean;
  description: string[];
}

export interface User {
  name: string;
  role: string;
  password: string;
}

export interface DigitalOceanDatabaseCertificateResponse {
  ca: DigitalOceanDatabaseCertificate;
}

export interface DigitalOceanDatabaseCertificate {
  certificate: string;
}
