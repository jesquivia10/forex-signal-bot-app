import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTheme } from '@hooks/useTheme';
import { useSignalsStore } from '@store/signalsStore';
import { Card } from '@components/common/Card';
import { PriceChart } from '@components/charts/PriceChart';
import { ConfidenceLevel } from '@components/signals/ConfidenceLevel';
import { formatPrice, formatDateTime } from '@utils/formatting';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SignalDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme } = useTheme();
  const { activeSignals } = useSignalsStore();

  const signal = activeSignals.find((s) => s.id === id);

  if (!signal) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Stack.Screen options={{ title: 'Signal Not Found' }} />
        <View style={styles.centered}>
          <Text style={[styles.errorText, { color: theme.colors.textSecondary }]}>
            Signal not found or no longer active
          </Text>
        </View>
      </View>
    );
  }

  const signalColor = signal.type === 'BUY' ? theme.colors.buy : theme.colors.sell;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={{ padding: theme.spacing.md }}
    >
      <Stack.Screen options={{ title: signal.currencyPair }} />

      <Card style={{ marginBottom: theme.spacing.md }}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.pair, { color: theme.colors.text }]}>{signal.currencyPair}</Text>
            <Text style={[styles.timestamp, { color: theme.colors.textSecondary }]}>
              {formatDateTime(signal.timestamp)}
            </Text>
          </View>
          <View style={[styles.signalBadge, { backgroundColor: signalColor }]}>
            <MaterialCommunityIcons
              name={signal.type === 'BUY' ? 'arrow-up' : 'arrow-down'}
              size={32}
              color="#FFFFFF"
            />
            <Text style={styles.signalType}>{signal.type}</Text>
          </View>
        </View>

        <ConfidenceLevel level={signal.confidence} />

        <View style={styles.priceSection}>
          <Text style={[styles.priceLabel, { color: theme.colors.textSecondary }]}>
            Entry Price
          </Text>
          <Text style={[styles.price, { color: theme.colors.text }]}>
            {formatPrice(signal.price)}
          </Text>
        </View>
      </Card>

      <Card style={{ marginBottom: theme.spacing.md }}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Reasoning</Text>
        <Text style={[styles.reason, { color: theme.colors.textSecondary }]}>
          {signal.reason}
        </Text>
      </Card>

      <Card style={{ marginBottom: theme.spacing.md }}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Technical Indicators
        </Text>

        <View style={styles.indicatorRow}>
          <Text style={[styles.indicatorLabel, { color: theme.colors.textSecondary }]}>RSI</Text>
          <Text style={[styles.indicatorValue, { color: theme.colors.text }]}>
            {signal.indicators.rsi.value.toFixed(2)} ({signal.indicators.rsi.condition})
          </Text>
        </View>

        <View style={styles.indicatorRow}>
          <Text style={[styles.indicatorLabel, { color: theme.colors.textSecondary }]}>
            Bollinger Upper
          </Text>
          <Text style={[styles.indicatorValue, { color: theme.colors.text }]}>
            {formatPrice(signal.indicators.bollingerBands.upper)}
          </Text>
        </View>

        <View style={styles.indicatorRow}>
          <Text style={[styles.indicatorLabel, { color: theme.colors.textSecondary }]}>
            Bollinger Middle
          </Text>
          <Text style={[styles.indicatorValue, { color: theme.colors.text }]}>
            {formatPrice(signal.indicators.bollingerBands.middle)}
          </Text>
        </View>

        <View style={styles.indicatorRow}>
          <Text style={[styles.indicatorLabel, { color: theme.colors.textSecondary }]}>
            Bollinger Lower
          </Text>
          <Text style={[styles.indicatorValue, { color: theme.colors.text }]}>
            {formatPrice(signal.indicators.bollingerBands.lower)}
          </Text>
        </View>

        <View style={styles.indicatorRow}>
          <Text style={[styles.indicatorLabel, { color: theme.colors.textSecondary }]}>
            SMA 20 / 50
          </Text>
          <Text style={[styles.indicatorValue, { color: theme.colors.text }]}>
            {formatPrice(signal.indicators.movingAverages.sma20)} /{' '}
            {formatPrice(signal.indicators.movingAverages.sma50)}
          </Text>
        </View>

        <View style={styles.indicatorRow}>
          <Text style={[styles.indicatorLabel, { color: theme.colors.textSecondary }]}>Trend</Text>
          <Text style={[styles.indicatorValue, { color: theme.colors.text }]}>
            {signal.indicators.movingAverages.trend}
          </Text>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  pair: {
    fontSize: 24,
    fontWeight: '700',
  },
  timestamp: {
    fontSize: 13,
    marginTop: 4,
  },
  signalBadge: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  signalType: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 4,
  },
  priceSection: {
    marginTop: 16,
  },
  priceLabel: {
    fontSize: 13,
    marginBottom: 4,
  },
  price: {
    fontSize: 32,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  reason: {
    fontSize: 14,
    lineHeight: 20,
  },
  indicatorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  indicatorLabel: {
    fontSize: 14,
  },
  indicatorValue: {
    fontSize: 14,
    fontWeight: '600',
  },
});
