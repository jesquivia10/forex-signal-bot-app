import { FlatList, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Card, Chip, Divider, Text, useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { ScreenContainer } from '../components/ScreenContainer';
import { useSignalsHistory } from '../hooks';
import type { Signal } from '../../domain/entities';

const formatDateTime = (value: string) => new Date(value).toLocaleString();

export function SignalsHistoryScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const { data: signals = [], isLoading, error, refetch } = useSignalsHistory();

  const bullish = signals.filter((item) => item.direction === 'buy').length;
  const bearish = signals.length - bullish;

  return (
    <ScreenContainer
      title={t('screens.history.title')}
      subtitle={t('screens.history.subtitle')}
      headerAccessory={<Chip icon="chart-bar">{t('screens.history.performanceSnapshot')}</Chip>}
    >
      <Card mode="outlined">
        <Card.Content>
          <Text variant="titleMedium">{t('screens.history.metricsTitle')}</Text>
          <Divider style={styles.divider} />
          <View style={styles.metricsRow}>
            <Metric label={t('screens.history.totalSignals')} value={String(signals.length)} />
            <Metric label={t('screens.history.bullishSignals')} value={String(bullish)} />
            <Metric label={t('screens.history.bearishSignals')} value={String(bearish)} />
          </View>
        </Card.Content>
      </Card>

      <Card mode="outlined">
        <Card.Content style={styles.listWrapper}>
          <Text variant="titleMedium" style={styles.listTitle}>
            {t('screens.history.recentSignals')}
          </Text>
          <Divider style={styles.divider} />
          {isLoading ? (
            <View style={styles.loadingState}>
              <ActivityIndicator animating />
              <Text style={{ color: theme.colors.onSurfaceVariant }}>{t('screens.history.loading')}</Text>
            </View>
          ) : error ? (
            <View style={styles.loadingState}>
              <Text variant="bodyMedium" style={{ color: theme.colors.error }}>
                {t('screens.history.error')}
              </Text>
              <Chip icon="refresh" onPress={() => refetch()}>
                {t('screens.history.retry')}
              </Chip>
            </View>
          ) : (
            <FlatList
              data={signals}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => (
                <Divider style={{ marginVertical: 8, backgroundColor: theme.colors.surfaceVariant }} />
              )}
              renderItem={({ item }) => <HistoryRow item={item} />}
              scrollEnabled={false}
              ListEmptyComponent={
                <View style={styles.loadingState}>
                  <Text style={{ color: theme.colors.onSurfaceVariant }}>{t('screens.history.empty')}</Text>
                </View>
              }
            />
          )}
        </Card.Content>
      </Card>
    </ScreenContainer>
  );
}

function HistoryRow({ item }: { item: Signal }) {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <View style={styles.historyRow}>
      <View style={styles.historyInfo}>
        <Text variant="titleSmall">{item.pair}</Text>
        <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
          {formatDateTime(item.createdAt)}
        </Text>
      </View>
      <Chip
        icon={item.direction === 'buy' ? 'arrow-up-bold' : 'arrow-down-bold'}
        style={item.direction === 'buy' ? styles.buyChip : styles.sellChip}
        textStyle={styles.chipText}
      >
        {t(`screens.common.${item.direction}`)}
      </Chip>
      <Text variant="bodyMedium" style={styles.confidence}>
        {t('screens.history.confidence', { level: Math.round(item.confidence * 100) })}
      </Text>
    </View>
  );
}

type MetricProps = {
  label: string;
  value: string;
};

function Metric({ label, value }: MetricProps) {
  const theme = useTheme();
  return (
    <View style={styles.metric}>
      <Text variant="labelMedium" style={{ color: theme.colors.onSurfaceVariant }}>
        {label}
      </Text>
      <Text variant="titleMedium">{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  divider: {
    marginVertical: 12,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    flexWrap: 'wrap',
  },
  metric: {
    minWidth: '30%',
    gap: 4,
  },
  listWrapper: {
    gap: 12,
  },
  listTitle: {
    fontWeight: '600',
  },
  loadingState: {
    paddingVertical: 24,
    alignItems: 'center',
    gap: 12,
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  historyInfo: {
    flex: 1,
    gap: 4,
  },
  confidence: {
    fontWeight: '600',
  },
  buyChip: {
    backgroundColor: '#E3FCEF',
  },
  sellChip: {
    backgroundColor: '#FEE2E2',
  },
  chipText: {
    fontWeight: '600',
  },
});
