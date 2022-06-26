import { accountSteps } from './account';
import { dropletSteps } from './droplets';
import { projectSteps } from './projects';
import { volumeSteps } from './volumes';

const integrationSteps = [
  ...accountSteps,
  ...dropletSteps,
  ...projectSteps,
  ...volumeSteps,
];

export { integrationSteps };
