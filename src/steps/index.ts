import { accountSteps } from './account';
import { dropletSteps } from './droplets';

const integrationSteps = [...accountSteps, ...dropletSteps];

export { integrationSteps };
