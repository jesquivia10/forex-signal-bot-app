import { useEffect, useCallback } from 'react';
import { NotificationService } from '@services/notifications/notificationService';
import { useSignalsStore } from '@store/signalsStore';
import { useSettingsStore } from '@store/settingsStore';
import { Signal } from '@types/signal.types';
import * as Notifications from 'expo-notifications';

const notificationService = NotificationService.getInstance();

export const useNotifications = () => {
  const { notificationsEnabled } = useSettingsStore();
  const { activeSignals } = useSignalsStore();

  useEffect(() => {
    if (!notificationsEnabled) return;

    const cleanup = notificationService.setupNotificationListeners(
      (notification) => {
        console.log('Notification received:', notification);
      },
      (response) => {
        console.log('Notification response:', response);
        // Handle notification tap - could navigate to signal detail
        const signal = response.notification.request.content.data.signal as Signal;
        if (signal) {
          // TODO: Navigate to signal detail
          console.log('Navigate to signal:', signal.id);
        }
      }
    );

    return cleanup;
  }, [notificationsEnabled]);

  const requestPermissions = useCallback(async () => {
    return await notificationService.requestPermissions();
  }, []);

  const sendSignalNotification = useCallback(
    async (signal: Signal) => {
      if (notificationsEnabled) {
        await notificationService.sendSignalNotification(signal);
      }
    },
    [notificationsEnabled]
  );

  const sendBulkNotification = useCallback(
    async (signals: Signal[]) => {
      if (notificationsEnabled) {
        await notificationService.sendBulkSignalNotification(signals);
      }
    },
    [notificationsEnabled]
  );

  return {
    requestPermissions,
    sendSignalNotification,
    sendBulkNotification,
    activeSignals,
  };
};
