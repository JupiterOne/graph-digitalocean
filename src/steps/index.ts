import { accountSteps } from './account';
import { alertPolicySteps } from './alerts';
import { certificateSteps } from './certificates';
import { databaseSteps } from './databases';
import { domainSteps } from './domains';
import { dropletSteps } from './droplets';
import { firewallSteps } from './firewall';
import { ipSteps } from './ips';
import { kubernetesSteps } from './k8s';
import { sshKeySteps } from './keys';
import { projectSteps } from './projects';
import { regionsSteps } from './regions';
import { registrySteps } from './registries';
import { snapshotsSteps } from './snapshots';
import { volumeSteps } from './volumes';

const integrationSteps = [
  ...accountSteps,
  ...dropletSteps,
  ...projectSteps,
  ...volumeSteps,
  ...domainSteps,
  ...ipSteps,
  ...sshKeySteps,
  ...databaseSteps,
  ...snapshotsSteps,
  ...firewallSteps,
  ...alertPolicySteps,
  ...regionsSteps,
  ...certificateSteps,
  ...registrySteps,
  ...kubernetesSteps,
];

export { integrationSteps };
