import { StyleSheet } from 'react-native';
import { Button, Card, List, SegmentedButtons, Switch, Text } from 'react-native-paper';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ScreenContainer } from '../components/ScreenContainer';
import { useUserSettings } from '../hooks';
import { DEFAULT_REFRESH_INTERVAL_MINUTES } from '../../config/constants';

const intervals = ['15', '30', '60'] as const;

export function SettingsScreen() {
  const { t } = useTranslation();
  const { settings, isLoading, updateSettings, isUpdating } = useUserSettings();

  const notificationsEnabled = settings?.notificationPreference.enabled ?? false;
  const selectedInterval = String(settings?.notificationPreference.intervalMinutes ?? DEFAULT_REFRESH_INTERVAL_MINUTES) as (typeof intervals)[number];
  const rsiPreset =
    settings && settings.indicatorParameters.rsiOverbought === 70 && settings.indicatorParameters.rsiOversold === 30
      ? 'default'
      : 'custom';

  const intervalOptions = useMemo(
    () =>
      intervals.map((minutes) => ({
        value: minutes,
        label: t('screens.settings.everyMinutes', { minutes }),
      })),
    [t],
  );

  return (
    <ScreenContainer title={t('screens.settings.title')} subtitle={t('screens.settings.subtitle')}>
      <Card style={styles.card} mode="outlined">
        <Card.Title title={t('screens.settings.profileTitle')} />
        <Card.Content style={styles.sectionContent}>
          <List.Item
            title={t('screens.settings.preferredPairs')}
            description={settings?.preferredPairs.join(', ')}
            left={(props) => <List.Icon {...props} icon="currency-usd" />}
          />
          <List.Item
            title={t('screens.settings.refreshInterval')}
            description={t('screens.settings.everyMinutes', {
              minutes: settings?.notificationPreference.intervalMinutes ?? DEFAULT_REFRESH_INTERVAL_MINUTES,
            })}
            left={(props) => <List.Icon {...props} icon="clock-outline" />}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card} mode="outlined">
        <Card.Title title={t('screens.settings.notificationsTitle')} />
        <Card.Content style={styles.sectionContent}>
          <List.Item
            title={t('screens.settings.enableNotifications')}
            description={t('screens.settings.enableNotificationsDescription')}
            right={() => (
              <Switch
                value={notificationsEnabled}
                onValueChange={(value) => {
                  void updateSettings({
                    notificationPreference: { enabled: value },
                  });
                }}
                accessibilityLabel={t('screens.settings.enableNotifications')}
                disabled={isLoading || isUpdating}
              />
            )}
          />
          <Text variant="labelLarge">{t('screens.settings.frequency')}</Text>
            <SegmentedButtons
              value={selectedInterval}
              onValueChange={(value) => {
                void updateSettings({
                  notificationPreference: { intervalMinutes: Number(value) },
                });
              }}
              buttons={intervalOptions.map((option) => ({
                ...option,
                disabled: isLoading || isUpdating,
              }))}
            />
        </Card.Content>
      </Card>

      <Card style={styles.card} mode="outlined">
        <Card.Title title={t('screens.settings.indicatorsTitle')} />
        <Card.Content style={styles.sectionContent}>
          <List.Item
            title={t('screens.settings.rsiPreset')}
            description={t('screens.settings.rsiPresetDescription')}
            right={() => (
              <SegmentedButtons
                value={rsiPreset}
                onValueChange={(value) => {
                  if (value === 'default') {
                    void updateSettings({
                      indicatorParameters: {
                        rsiOverbought: 70,
                        rsiOversold: 30,
                      },
                    });
                  }
                }}
                buttons={[
                  { value: 'default', label: t('screens.settings.default'), disabled: isLoading || isUpdating },
                  { value: 'custom', label: t('screens.settings.custom'), disabled: isLoading || isUpdating },
                ]}
              />
            )}
          />
          <List.Item
            title={t('screens.settings.movingAverages')}
            description={`${t('screens.settings.movingAveragesDescription')} (${settings?.indicatorParameters.movingAverageFast ?? 20}/${settings?.indicatorParameters.movingAverageSlow ?? 50})`}
            left={(props) => <List.Icon {...props} icon="sigma-lower" />}
          />
          <List.Item
            title={t('screens.settings.bollingerBands')}
            description={t('screens.settings.bollingerBandsDescription')}
            left={(props) => <List.Icon {...props} icon="chart-bell-curve" />}
          />
          <Button mode="contained-tonal" disabled={isLoading || isUpdating}>
            {t('screens.settings.managePresets')}
          </Button>
        </Card.Content>
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
  },
  sectionContent: {
    gap: 16,
  },
});
