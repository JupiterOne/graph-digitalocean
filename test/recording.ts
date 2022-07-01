import {
  Entity,
  IntegrationInstanceConfig,
  IntegrationInvocationConfig,
  Relationship,
} from '@jupiterone/integration-sdk-core';
import {
  setupRecording,
  Recording,
  SetupRecordingInput,
  mutations,
  executeStepWithDependencies,
  StepTestConfig,
} from '@jupiterone/integration-sdk-testing';
import { buildStepTestConfigForStep } from './config';

export { Recording };

export function setupProjectRecording(
  input: Omit<SetupRecordingInput, 'mutateEntry'>,
): Recording {
  return setupRecording({
    ...input,
    redactedRequestHeaders: ['Authorization'],
    redactedResponseHeaders: ['set-cookie'],
    mutateEntry: mutations.unzipGzippedRecordingEntry,
  });
}

function redact(entry) {
  mutations.unzipGzippedRecordingEntry(entry);
  // const DEFAULT_REDACT = '[REDACTED]';
  // const keysToRedactMap = new Map();
  const response = JSON.parse(entry.response.content.text);
  if (response.account) {
    response.account = redactAccount(response.account);
  }
  entry.response.content.text = JSON.stringify(response);
}

function redactAccount(account) {
  account['email'] = 'first.last@example.com';
  return account;
}

type WithRecordingParams = {
  recordingName: string;
  directoryName: string;
  recordingSetupOptions?: SetupRecordingInput['options'];
};

export async function withRecording(
  { recordingName, directoryName, recordingSetupOptions }: WithRecordingParams,
  cb: () => Promise<void>,
) {
  const recording = setupRecording({
    directory: directoryName,
    name: recordingName,
    options: {
      ...(recordingSetupOptions || {}),
    },
    mutateEntry: (entry) => {
      redact(entry);
    },
  });

  try {
    await cb();
  } finally {
    await recording.stop();
  }
}

type AfterStepCollectionExecutionParams = {
  stepConfig: StepTestConfig<
    IntegrationInvocationConfig<IntegrationInstanceConfig>,
    IntegrationInstanceConfig
  >;
  stepResult: {
    collectedEntities: Entity[];
    collectedRelationships: Relationship[];
    collectedData: {
      [key: string]: any;
    };
    encounteredTypes: string[];
  };
};

type CreateStepCollectionTestParams = WithRecordingParams & {
  stepId: string;
  afterExecute?: (params: AfterStepCollectionExecutionParams) => Promise<void>;
};

function isMappedRelationship(r: Relationship): boolean {
  return !!r._mapping;
}

function filterDirectRelationships(
  relationships: Relationship[],
): Relationship[] {
  return relationships.filter((r) => !isMappedRelationship(r));
}

export function createStepCollectionTest({
  recordingName,
  directoryName,
  recordingSetupOptions,
  stepId,
  afterExecute,
}: CreateStepCollectionTestParams) {
  return async () => {
    await withRecording(
      {
        directoryName,
        recordingName,
        recordingSetupOptions,
      },
      async () => {
        const stepConfig = buildStepTestConfigForStep(stepId);
        const stepResult = await executeStepWithDependencies(stepConfig);

        expect({
          ...stepResult,
          // HACK (austinkelleher): `@jupiterone/integration-sdk-testing`
          // does not currently support `toMatchStepMetadata` with mapped
          // relationships, which is causing tests to fail. We will add
          // support soon and remove this hack.
          collectedRelationships: filterDirectRelationships(
            stepResult.collectedRelationships,
          ),
        }).toMatchStepMetadata({
          ...stepConfig,
          invocationConfig: {
            ...stepConfig.invocationConfig,
            integrationSteps: stepConfig.invocationConfig.integrationSteps.map(
              (s) => {
                return {
                  ...s,
                  mappedRelationships: [],
                };
              },
            ),
          },
        });

        if (afterExecute) await afterExecute({ stepResult, stepConfig });
      },
    );
  };
}
