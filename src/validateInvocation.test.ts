import { createMockExecutionContext } from '@jupiterone/integration-sdk-testing';
import { integrationConfig } from '../test/config';
import { withRecording } from '../test/recording';
import { IntegrationConfig, validateInvocation } from './config';

describe('#validateInvocation', () => {
  test('requires valid config', async () => {
    const executionContext = createMockExecutionContext<IntegrationConfig>({
      instanceConfig: {} as IntegrationConfig,
    });

    await expect(validateInvocation(executionContext)).rejects.toThrow(
      'Config requires an accessToken',
    );
  });

  /**
   * Testing a successful authorization can be done with recordings
   */
  test.skip('successfully validates invocation', async () => {
    await withRecording(
      {
        recordingName: 'validates-invocation',
        directoryName: __dirname,
        recordingSetupOptions: {
          recordFailedRequests: true,
        },
      },
      async () => {
        // Pass integrationConfig to authenticate with real credentials
        const executionContext = createMockExecutionContext({
          instanceConfig: integrationConfig,
        });

        // successful validateInvocation doesn't throw errors and will be undefined
        await expect(
          validateInvocation(executionContext),
        ).resolves.toBeUndefined();
      },
    );
  });

  /* Adding `describe` blocks segments the tests into logical sections
   * and makes the output of `yarn test --verbose` provide meaningful
   * to project information to future maintainers.
   */
  describe('fails validating invocation', () => {
    /**
     * Testing failing authorizations can be done with recordings as well.
     * For each possible failure case, a test can be made to ensure that
     * error messaging is expected and clear to end-users
     */
    describe('invalid user credentials', () => {
      test('should throw if invalid accessToken', async () => {
        await withRecording(
          {
            recordingName: 'client-id-auth-error',
            directoryName: __dirname,
            recordingSetupOptions: {
              recordFailedRequests: true,
            },
          },
          async () => {
            const executionContext = createMockExecutionContext({
              instanceConfig: {
                accessToken: 'invalid-access-token',
              },
            });

            // tests validate that invalid configurations throw an error
            // with an appropriate and expected message.
            await expect(validateInvocation(executionContext)).rejects.toThrow(
              'Provider authentication failed at https://api.digitalocean.com/v2/account: 401 Unauthorized',
            );
          },
        );
      });
    });
  });
});
