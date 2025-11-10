import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

import type { Signal, UserSettings } from '../../domain/entities';
import type { SignalNotificationPort } from '../../domain/usecases/GenerateSignalsUseCase';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export class NotificationService implements SignalNotificationPort {
  private permissionsGranted = false;

  async initialize(): Promise<void> {
    if (!Device.isDevice) {
      console.warn('[NotificationService] Notifications are not supported on simulators.');
      return;
    }

    const existingStatus = (await Notifications.getPermissionsAsync()).status;
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const permissionResponse = await Notifications.requestPermissionsAsync();
      finalStatus = permissionResponse.status;
    }

    this.permissionsGranted = finalStatus === 'granted';
    if (!this.permissionsGranted) {
      console.warn('[NotificationService] Notification permissions were not granted.');
    }
  }

  async notify(signal: Signal, settings: UserSettings): Promise<void> {
    if (!this.permissionsGranted || !settings.notificationPreference.enabled) {
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: `${signal.pair} • ${signal.direction.toUpperCase()}`,
        body: `Confidence ${Math.round(signal.confidence * 100)}%. ${signal.rationale[0] ?? ''}`,
        data: {
          signalId: signal.id,
        },
      },
      trigger: null,
    });
  }
}
