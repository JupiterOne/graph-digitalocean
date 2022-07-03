export interface DigitalOceanKubernetesCluster {
  id: string;
  name: string;
  region: string;
  version: string;
  cluster_subnet: string;
  service_subnet: string;
  vpc_uuid: string;
  ipv4: string;
  endpoint: string;
  tags: string[];
  node_pools: NodePool[];
  maintenance_policy: MaintenancePolicy;
  auto_upgrade: boolean;
  status: DigitalOceanKubernetesClusterStatus;
  created_at: Date;
  updated_at: Date;
  surge_upgrade: boolean;
  registry_enabled: boolean;
  ha: boolean;
}

export interface MaintenancePolicy {
  start_time: string;
  duration: string;
  day: string;
}

export interface NodePool {
  id: string;
  name: string;
  size: string;
  count: number;
  tags: string[];
  labels: Labels | null;
  taints: string[];
  auto_scale: boolean;
  min_nodes: number;
  max_nodes: number;
  nodes: Node[];
}

export interface Labels {
  service: string;
  priority: string;
}

export interface Node {
  id: string;
  name: string;
  status: NodeStatus;
  droplet_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface NodeStatus {
  state: string;
}

export interface DigitalOceanKubernetesClusterStatus {
  state: string;
  message: string;
}
