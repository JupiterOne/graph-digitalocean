import { accountSteps } from './account';
import { databaseSteps } from './databases';
import { domainSteps } from './domains';
import { dropletSteps } from './droplets';
import { imagesSteps } from './images';
import { ipSteps } from './ips';
import { sshKeySteps } from './keys';
import { projectSteps } from './projects';
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
  ...imagesSteps,
];

export { integrationSteps };
