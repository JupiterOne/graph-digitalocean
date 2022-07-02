export interface DigitalOceanAlertPolciy {
  alerts: Alerts;
  compare: string;
  description: string;
  enabled: boolean;
  entities: number[];
  tags: string[];
  type: string;
  uuid: string;
  value: number;
  window: string;
}

export interface Alerts {
  email: string[];
  slack: Slack[];
}

export interface Slack {
  channel: string;
  url: string;
}
