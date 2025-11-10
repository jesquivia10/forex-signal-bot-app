import { useEffect, useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Chip, List, ProgressBar, Surface, Text, useTheme, Button, Card } from 'react-native-paper';
import {
  VictoryAxis,
  VictoryCandlestick,
  VictoryChart,
  VictoryLegend,
  VictoryLine,
  VictoryTheme,
} from 'victory-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import type { RootStackParamList } from '../../app/navigation/types';
import { usePairMarketData } from '../hooks';
import dayjs from 'dayjs';

type Props = NativeStackScreenProps<RootStackParamList, 'SignalDetail'>;

export function SignalDetailScreen({ route, navigation }: Props) {
  const { signal } = route.params;
  const theme = useTheme();
  const palette = theme.colors as unknown as Record<string, string>;
  const successColor = palette.success ?? '#2BAE66';
  const { t } = useTranslation();
  const { data: candles = [], isLoading } = usePairMarketData({ pair: signal.pair, interval: '15min' });

  useEffect(() => {
    navigation.setOptions({ title: signal.pair });
  }, [navigation, signal.pair]);

  const chartData = useMemo(
    () =>
      [...candles]
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
        .slice(-80)
        .map((candle) => ({
          x: new Date(candle.timestamp),
          open: candle.open,
          close: candle.close,
          high: candle.high,
          low: candle.low,
        })),
    [candles],
  );

  const extent = useMemo(() => {
    if (chartData.length === 0) {
      return null;
    }
    const closes = chartData.map((item) => item.close);
    return {
      min: Math.min(...closes),
      max: Math.max(...closes),
    };
  }, [chartData]);

  const bandLines = useMemo(() => {
    if (chartData.length === 0) {
      return [];
    }
    const first = chartData[0].x;
    const last = chartData[chartData.length - 1].x;
    const { bollinger, movingAverages } = signal.indicatorSnapshot;
    return [
      {
        name: 'Upper Band',
        color: theme.colors.error,
        data: [
          { x: first, y: bollinger.upper },
          { x: last, y: bollinger.upper },
        ],
      },
      {
        name: 'Middle Band',
        color: theme.colors.primary,
        data: [
          { x: first, y: bollinger.middle },
          { x: last, y: bollinger.middle },
        ],
      },
      {
        name: 'Lower Band',
        color: successColor,
        data: [
          { x: first, y: bollinger.lower },
          { x: last, y: bollinger.lower },
        ],
      },
      {
        name: 'EMA Fast',
        color: theme.colors.secondary,
        data: [
          { x: first, y: movingAverages.emaFast },
          { x: last, y: movingAverages.emaFast },
        ],
      },
      {
        name: 'EMA Slow',
        color: theme.colors.outline,
        data: [
          { x: first, y: movingAverages.emaSlow },
          { x: last, y: movingAverages.emaSlow },
        ],
      },
    ];
  }, [chartData, signal.indicatorSnapshot, theme.colors]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }} contentContainerStyle={styles.container}>
      <Surface style={[styles.header, { backgroundColor: theme.colors.surface }]} elevation={1}>
        <View style={styles.headerRow}>
          <View style={{ flex: 1, gap: 4 }}>
            <Text variant="headlineSmall">{signal.pair}</Text>
            <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
              {dayjs(signal.createdAt).format('MMM D, YYYY HH:mm')}
            </Text>
          </View>
          <Chip
            icon={signal.direction === 'buy' ? 'arrow-up-bold' : 'arrow-down-bold'}
            style={{
              backgroundColor: signal.direction === 'buy' ? '#E3FCEF' : '#FEE2E2',
            }}
            textStyle={{ color: signal.direction === 'buy' ? successColor : theme.colors.error, fontWeight: '600' }}
          >
            {t(`screens.common.${signal.direction}`)}
          </Chip>
        </View>
        <View style={{ gap: 8 }}>
          <Text variant="labelLarge">{t('screens.dashboard.confidence', { level: `${Math.round(signal.confidence * 100)}%` })}</Text>
          <ProgressBar progress={signal.confidence} style={{ height: 10, borderRadius: 8 }} />
        </View>
      </Surface>

      <Card mode="outlined">
        <Card.Title title={t('screens.dashboard.detailTitle')} />
        <Card.Content>
          {chartData.length > 0 ? (
              <>
                <VictoryChart
                  theme={VictoryTheme.material}
                  scale={{ x: 'time' }}
                  domainPadding={{ x: 16, y: 25 }}
                  height={280}
                >
                  <VictoryAxis
                    tickFormat={(value: Date | string | number) => dayjs(value).format('HH:mm')}
                    style={{ tickLabels: { fill: theme.colors.onSurfaceVariant } }}
                  />
                  <VictoryAxis dependentAxis style={{ tickLabels: { fill: theme.colors.onSurfaceVariant } }} />
                  <VictoryCandlestick
                    candleColors={{
                      positive: successColor,
                      negative: theme.colors.error,
                    }}
                    data={chartData}
                  />
                {bandLines.map((line) => (
                  <VictoryLine key={line.name} data={line.data} style={{ data: { stroke: line.color, strokeDasharray: '6,4' } }} />
                ))}
                <VictoryLegend
                  x={20}
                  y={5}
                  orientation="horizontal"
                  gutter={12}
                  data={bandLines.slice(0, 3).map((line) => ({ name: line.name, symbol: { fill: line.color } }))}
                />
              </VictoryChart>
              {extent ? (
                <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant, marginTop: 8 }}>
                  {t('screens.dashboard.range', { min: extent.min.toFixed(5), max: extent.max.toFixed(5) })}
                </Text>
              ) : null}
            </>
          ) : (
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
              {isLoading ? t('screens.history.loading') : t('screens.history.empty')}
            </Text>
          )}
        </Card.Content>
      </Card>

      <Card mode="outlined">
        <Card.Title title={t('screens.settings.indicatorsTitle')} />
        <Card.Content>
          <List.Item
            title="Bollinger Bands"
            description={`Upper: ${signal.indicatorSnapshot.bollinger.upper.toFixed(5)}  •  Middle: ${signal.indicatorSnapshot.bollinger.middle.toFixed(5)}  •  Lower: ${signal.indicatorSnapshot.bollinger.lower.toFixed(5)}`}
            left={(props) => <List.Icon {...props} icon="chart-bell-curve" />}
          />
          <List.Item
            title="RSI"
            description={signal.indicatorSnapshot.rsi.toFixed(2)}
            left={(props) => <List.Icon {...props} icon="gauge" />}
          />
          <List.Item
            title="Moving Averages"
            description={`EMA Fast: ${signal.indicatorSnapshot.movingAverages.emaFast.toFixed(5)} • EMA Slow: ${signal.indicatorSnapshot.movingAverages.emaSlow.toFixed(5)}`}
            left={(props) => <List.Icon {...props} icon="chart-timeline-variant" />}
          />
        </Card.Content>
      </Card>

      <Card mode="outlined">
        <Card.Title title={t('screens.dashboard.rationaleTitle')} />
        <Card.Content style={{ gap: 12 }}>
          {signal.rationale.map((reason) => (
            <View key={reason} style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
              <Text style={{ color: theme.colors.primary }}>•</Text>
              <Text style={{ flex: 1 }}>{reason}</Text>
            </View>
          ))}
        </Card.Content>
      </Card>

      <Button mode="contained-tonal" onPress={() => navigation.navigate('Legal')} style={{ marginTop: 16 }}>
        {t('screens.dashboard.openLegal')}
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  header: {
    padding: 16,
    borderRadius: 20,
    gap: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});
