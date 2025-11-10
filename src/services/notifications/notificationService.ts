import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { Signal } from '@types/signal.types';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export class NotificationService {
  private static instance: NotificationService;

  private constructor() {}

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  async requestPermissions(): Promise<boolean> {
    if (!Device.isDevice) {
      console.log('Notifications only work on physical devices');
      return false;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.log('Failed to get push notification permissions');
      return false;
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('signals', {
        name: 'Trading Signals',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#00D4AA',
      });
    }

    return true;
  }

  async sendSignalNotification(signal: Signal): Promise<void> {
    try {
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) return;

      await Notifications.scheduleNotificationAsync({
        content: {
          title: `${signal.type} Signal - ${signal.currencyPair}`,
          body: `${signal.confidence} confidence at ${signal.price.toFixed(5)}. ${signal.reason}`,
          data: { signal },
          sound: true,
          priority: Notifications.AndroidNotificationPriority.HIGH,
          categoryIdentifier: 'TRADING_SIGNAL',
        },
        trigger: null, // Send immediately
      });
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }

  async sendBulkSignalNotification(signals: Signal[]): Promise<void> {
    if (signals.length === 0) return;

    try {
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) return;

      const highConfidenceSignals = signals.filter((s) => s.confidence === 'HIGH');
      const signalCount = signals.length;

      await Notifications.scheduleNotificationAsync({
        content: {
          title: `${signalCount} New Trading Signal${signalCount > 1 ? 's' : ''}`,
          body:
            highConfidenceSignals.length > 0
              ? `Including ${highConfidenceSignals.length} high confidence signal${
                  highConfidenceSignals.length > 1 ? 's' : ''
                }`
              : `Check the app for details`,
          data: { signals },
          sound: true,
        },
        trigger: null,
      });
    } catch (error) {
      console.error('Error sending bulk notification:', error);
    }
  }

  async cancelAllNotifications(): Promise<void> {
    await Notifications.cancelAllScheduledNotificationsAsync();
  }

  async getBadgeCount(): Promise<number> {
    return await Notifications.getBadgeCountAsync();
  }

  async setBadgeCount(count: number): Promise<void> {
    await Notifications.setBadgeCountAsync(count);
  }

  async clearBadge(): Promise<void> {
    await Notifications.setBadgeCountAsync(0);
  }

  setupNotificationListeners(
    onNotificationReceived?: (notification: Notifications.Notification) => void,
    onNotificationResponse?: (response: Notifications.NotificationResponse) => void
  ): () => void {
    const receivedSubscription = Notifications.addNotificationReceivedListener((notification) => {
      onNotificationReceived?.(notification);
    });

    const responseSubscription = Notifications.addNotificationResponseReceivedListener((response) => {
      onNotificationResponse?.(response);
    });

    return () => {
      receivedSubscription.remove();
      responseSubscription.remove();
    };
  }
}
