import { accountSteps } from './account';
import { dropletSteps } from './droplets';
import { projectSteps } from './projects';

const integrationSteps = [...accountSteps, ...dropletSteps, ...projectSteps];

export { integrationSteps };
