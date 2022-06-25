import { executeStepWithDependencies } from '@jupiterone/integration-sdk-testing';
import { buildStepTestConfigForStep } from '../../../test/config';
import { createStepCollectionTest, Recording } from '../../../test/recording';
import { Steps } from '../constants';

test(
  'fetch-users',
  createStepCollectionTest({
    directoryName: __dirname,
    recordingName: 'fetch-account',
    stepId: Steps.ACCOUNT,
  }),
);
