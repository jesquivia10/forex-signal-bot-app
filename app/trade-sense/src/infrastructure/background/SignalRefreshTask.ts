import * as BackgroundFetch from 'expo-background-fetch';
import { BackgroundFetchResult, BackgroundFetchStatus } from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

import type { GenerateSignalsUseCase } from '../../domain/usecases';

const TASK_NAME = 'TRADESENSE_SIGNAL_REFRESH';

let generateSignalsUseCase: GenerateSignalsUseCase | null = null;
let refreshIntervalSeconds = 15 * 60;

TaskManager.defineTask(TASK_NAME, async () => {
  if (!generateSignalsUseCase) {
    return BackgroundFetchResult.NoData;
  }

  try {
    const signals = await generateSignalsUseCase.execute();
    return signals.length > 0 ? BackgroundFetchResult.NewData : BackgroundFetchResult.NoData;
  } catch (error) {
    console.warn('[SignalRefreshTask] Execution failed', error);
    return BackgroundFetchResult.Failed;
  }
});

export async function registerSignalRefreshTask(
  usecase: GenerateSignalsUseCase,
  intervalMinutes: number,
): Promise<void> {
  generateSignalsUseCase = usecase;
  refreshIntervalSeconds = intervalMinutes * 60;

  const status = await BackgroundFetch.getStatusAsync();
  if (status !== BackgroundFetchStatus.Available) {
    console.warn('[SignalRefreshTask] Background fetch unavailable');
    return;
  }

  const registeredTasks = await TaskManager.getRegisteredTasksAsync();
  const alreadyRegistered = registeredTasks.some((task) => task.taskName === TASK_NAME);
  if (alreadyRegistered) {
    await BackgroundFetch.unregisterTaskAsync(TASK_NAME);
  }

  await BackgroundFetch.registerTaskAsync(TASK_NAME, {
    minimumInterval: refreshIntervalSeconds,
    stopOnTerminate: false,
    startOnBoot: true,
  });
}
