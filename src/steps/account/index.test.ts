import { createStepCollectionTest } from '../../../test/recording';
import { Steps } from '../constants';

test(
  'fetch-users',
  createStepCollectionTest({
    directoryName: __dirname,
    recordingName: 'fetch-account',
    stepId: Steps.ACCOUNT,
  }),
);
