import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Signal } from '@types/signal.types';
import { useTheme } from '@hooks/useTheme';
import { Card } from '../common/Card';
import { formatPrice, formatRelativeTime } from '@utils/formatting';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface SignalCardProps {
  signal: Signal;
  onPress?: () => void;
}

export const SignalCard: React.FC<SignalCardProps> = ({ signal, onPress }) => {
  const { theme } = useTheme();

  const getSignalIcon = () => {
    switch (signal.type) {
      case 'BUY':
        return 'arrow-up-circle';
      case 'SELL':
        return 'arrow-down-circle';
      default:
        return 'minus-circle';
    }
  };

  const getSignalColor = () => {
    switch (signal.type) {
      case 'BUY':
        return theme.colors.buy;
      case 'SELL':
        return theme.colors.sell;
      default:
        return theme.colors.neutral;
    }
  };

  const getConfidenceColor = () => {
    switch (signal.confidence) {
      case 'HIGH':
        return theme.colors.success;
      case 'MEDIUM':
        return theme.colors.warning;
      case 'LOW':
        return theme.colors.error;
    }
  };

  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress} activeOpacity={0.7}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <View style={styles.pairInfo}>
            <MaterialCommunityIcons
              name={getSignalIcon() as any}
              size={32}
              color={getSignalColor()}
            />
            <View style={styles.pairText}>
              <Text style={[styles.pair, { color: theme.colors.text }]}>{signal.currencyPair}</Text>
              <Text style={[styles.timestamp, { color: theme.colors.textSecondary }]}>
                {formatRelativeTime(signal.timestamp)}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.confidenceBadge,
              {
                backgroundColor: getConfidenceColor(),
                borderRadius: theme.borderRadius.sm,
              },
            ]}
          >
            <Text style={styles.confidenceText}>{signal.confidence}</Text>
          </View>
        </View>

        <View style={[styles.signalRow, { marginTop: theme.spacing.md }]}>
          <View>
            <Text style={[styles.label, { color: theme.colors.textSecondary }]}>Signal</Text>
            <Text style={[styles.value, { color: getSignalColor() }]}>{signal.type}</Text>
          </View>
          <View>
            <Text style={[styles.label, { color: theme.colors.textSecondary }]}>Price</Text>
            <Text style={[styles.value, { color: theme.colors.text }]}>
              {formatPrice(signal.price)}
            </Text>
          </View>
          <View>
            <Text style={[styles.label, { color: theme.colors.textSecondary }]}>RSI</Text>
            <Text style={[styles.value, { color: theme.colors.text }]}>
              {signal.indicators.rsi.value.toFixed(1)}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.reasonBox,
            {
              backgroundColor: theme.colors.surface,
              borderRadius: theme.borderRadius.sm,
              marginTop: theme.spacing.md,
              padding: theme.spacing.sm,
            },
          ]}
        >
          <Text style={[styles.reason, { color: theme.colors.textSecondary }]}>
            {signal.reason}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pairInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pairText: {
    marginLeft: 12,
  },
  pair: {
    fontSize: 20,
    fontWeight: '700',
  },
  timestamp: {
    fontSize: 12,
    marginTop: 2,
  },
  confidenceBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  confidenceText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  signalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
  },
  reasonBox: {},
  reason: {
    fontSize: 13,
    lineHeight: 18,
  },
});
