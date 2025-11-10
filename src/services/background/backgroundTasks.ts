import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { NotificationService } from '../notifications/notificationService';

const BACKGROUND_FETCH_TASK = 'FOREX_SIGNAL_CHECK';

export class BackgroundTaskService {
  private static instance: BackgroundTaskService;
  private notificationService: NotificationService;

  private constructor() {
    this.notificationService = NotificationService.getInstance();
    this.defineBackgroundTask();
  }

  static getInstance(): BackgroundTaskService {
    if (!BackgroundTaskService.instance) {
      BackgroundTaskService.instance = new BackgroundTaskService();
    }
    return BackgroundTaskService.instance;
  }

  private defineBackgroundTask(): void {
    TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
      try {
        console.log('Background task running...');
        
        // This will be implemented when we have the signal generation logic integrated
        // For now, just log that the task ran
        const now = Date.now();
        console.log(`Background fetch completed at ${new Date(now).toISOString()}`);

        return BackgroundFetch.BackgroundFetchResult.NewData;
      } catch (error) {
        console.error('Background task error:', error);
        return BackgroundFetch.BackgroundFetchResult.Failed;
      }
    });
  }

  async registerBackgroundTask(intervalMinutes: number = 15): Promise<void> {
    try {
      const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
      
      if (isRegistered) {
        await BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
      }

      await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
        minimumInterval: intervalMinutes * 60, // Convert to seconds
        stopOnTerminate: false,
        startOnBoot: true,
      });

      console.log('Background task registered successfully');
    } catch (error) {
      console.error('Failed to register background task:', error);
    }
  }

  async unregisterBackgroundTask(): Promise<void> {
    try {
      await BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
      console.log('Background task unregistered');
    } catch (error) {
      console.error('Failed to unregister background task:', error);
    }
  }

  async getStatus(): Promise<BackgroundFetch.BackgroundFetchStatus> {
    return await BackgroundFetch.getStatusAsync();
  }

  async isTaskRegistered(): Promise<boolean> {
    return await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
  }
}
