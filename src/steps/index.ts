import { accountSteps } from './account';
import { domainSteps } from './domains';
import { dropletSteps } from './droplets';
import { projectSteps } from './projects';
import { volumeSteps } from './volumes';

const integrationSteps = [
  ...accountSteps,
  ...dropletSteps,
  ...projectSteps,
  ...volumeSteps,
  ...domainSteps,
];

export { integrationSteps };
