import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';

import { useUserSettings } from '../presentation/hooks';
import { registerSignalRefreshTask } from '../infrastructure/background/SignalRefreshTask';
import { useServices } from './providers/ServiceProvider';

export function AppBootstrap({ children }: PropsWithChildren) {
  const { usecases, infrastructure } = useServices();
  const { settings } = useUserSettings();

  useEffect(() => {
    void infrastructure.notifications.initialize();
  }, [infrastructure.notifications]);

  useEffect(() => {
    if (!settings) {
      return;
    }
    void registerSignalRefreshTask(usecases.generateSignals, settings.notificationPreference.intervalMinutes);
  }, [settings?.notificationPreference.intervalMinutes, usecases.generateSignals]);

  return <>{children}</>;
}
