export interface DigitalOceanFirewall {
  id: string;
  name: string;
  status: string;
  inbound_rules: InboundRule[];
  outbound_rules: OutboundRule[];
  created_at: Date;
  droplet_ids: number[];
  tags: string[];
  pending_changes: any[];
}

export interface InboundRule {
  protocol: string;
  ports: string;
  sources: Sources;
}

export interface Sources {
  load_balancer_uids?: string[];
  tags?: string[];
  addresses?: string[];
}

export interface OutboundRule {
  protocol: string;
  ports: string;
  destinations: Destinations;
}

export interface Destinations {
  addresses: Addresses[];
}

export interface Addresses {
  addresses: string[];
}
