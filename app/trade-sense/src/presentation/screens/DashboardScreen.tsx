import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Card, Chip, IconButton, Text, useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { ScreenContainer } from '../components/ScreenContainer';
import { useActiveSignals, useUserSettings } from '../hooks';
import { DEFAULT_REFRESH_INTERVAL_MINUTES, SUPPORTED_PAIRS } from '../../config/constants';
import type { RootStackParamList, RootTabParamList } from '../../app/navigation/types';

function DirectionBadge({ direction }: { direction: 'buy' | 'sell' }) {
  const theme = useTheme();
  const palette = theme.colors as unknown as Record<string, string>;
  const successColor = palette.success ?? '#2BAE66';
  const errorColor = palette.error ?? '#E53935';
  const { t } = useTranslation();
  const isBuy = direction === 'buy';
  return (
    <Chip
      mode="flat"
      icon={isBuy ? 'arrow-up-bold' : 'arrow-down-bold'}
      style={[
        styles.directionChip,
        {
          backgroundColor: isBuy ? '#E3FCEF' : '#FEE2E2',
        },
      ]}
      textStyle={{ color: isBuy ? successColor : errorColor, fontWeight: '600' }}
    >
      {t(`screens.common.${direction}`)}
    </Chip>
  );
}

export function DashboardScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const { settings } = useUserSettings();
  const refreshInterval = settings?.notificationPreference.intervalMinutes ?? DEFAULT_REFRESH_INTERVAL_MINUTES;
  const { data: signals = [], isLoading, error, refetch, isFetching } = useActiveSignals({
    refreshIntervalMinutes: refreshInterval,
  });
  const navigation =
    useNavigation<
      CompositeNavigationProp<
        BottomTabNavigationProp<RootTabParamList, 'Dashboard'>,
        NativeStackNavigationProp<RootStackParamList>
      >
    >();

  return (
    <ScreenContainer
      title={t('screens.dashboard.title')}
      subtitle={t('screens.dashboard.subtitle')}
      headerAccessory={
        <View style={styles.headerActions}>
            <Chip icon="clock-outline">
              {t('screens.dashboard.nextUpdate', { minutes: refreshInterval })}
          </Chip>
          <IconButton icon="refresh" onPress={() => refetch()} loading={isFetching} accessibilityLabel={t('screens.dashboard.refresh')} />
        </View>
      }
    >
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isFetching && !isLoading} onRefresh={() => refetch()} tintColor={theme.colors.primary} />
        }
        contentContainerStyle={[styles.scrollContainer, { minHeight: 320 }]}
      >
        {isLoading ? (
          <View style={styles.loader}>
            <ActivityIndicator animating />
            <Text style={{ color: theme.colors.onSurfaceVariant }}>{t('screens.dashboard.loading')}</Text>
          </View>
        ) : error ? (
          <Card mode="outlined" style={styles.card}>
            <Card.Content style={styles.errorContent}>
              <Text variant="titleMedium" style={{ color: theme.colors.error }}>
                {t('screens.dashboard.errorTitle')}
              </Text>
              <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                {t('screens.dashboard.errorDescription')}
              </Text>
              <Button mode="contained-tonal" onPress={() => refetch()}>
                {t('screens.dashboard.retry')}
              </Button>
            </Card.Content>
          </Card>
        ) : signals.length === 0 ? (
          <Card mode="outlined" style={styles.card}>
            <Card.Content style={styles.emptyState}>
              <Text variant="titleMedium">{t('screens.dashboard.noSignalsTitle')}</Text>
              <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                {t('screens.dashboard.noSignalsDescription', {
                  pairs: settings?.preferredPairs?.join(', ') ?? SUPPORTED_PAIRS.join(', '),
                })}
              </Text>
              <Button mode="contained" onPress={() => refetch()}>
                {t('screens.dashboard.scanNow')}
              </Button>
            </Card.Content>
          </Card>
        ) : (
          <View style={styles.grid}>
            {signals.map((signal) => (
              <Card key={signal.id} style={styles.card} mode="elevated">
                <Card.Title title={signal.pair} titleVariant="titleLarge" right={() => <DirectionBadge direction={signal.direction} />} />
                <Card.Content style={styles.cardContent}>
                  <Text variant="headlineSmall" style={{ color: theme.colors.primary }}>
                    {t('screens.dashboard.confidence', { level: `${Math.round(signal.confidence * 100)}%` })}
                  </Text>
                  <View style={styles.rationaleList}>
                    {signal.rationale.map((reason) => (
                      <Text key={reason} variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                        • {reason}
                      </Text>
                    ))}
                  </View>
                </Card.Content>
                <Card.Actions>
                  <Button onPress={() => navigation.navigate('SignalDetail', { signal })}>
                    {t('screens.common.viewDetails')}
                  </Button>
                </Card.Actions>
              </Card>
            ))}
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 24,
  },
  grid: {
    gap: 16,
  },
  card: {
    borderRadius: 16,
  },
  cardContent: {
    gap: 12,
  },
  rationaleList: {
    gap: 6,
  },
  loader: {
    paddingVertical: 48,
    alignItems: 'center',
    gap: 12,
  },
  emptyState: {
    gap: 12,
  },
  errorContent: {
    gap: 12,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  directionChip: {
    alignSelf: 'flex-start',
  },
});
