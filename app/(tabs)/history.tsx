import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@hooks/useTheme';
import { useHistoryStore } from '@store/historyStore';
import { Card } from '@components/common/Card';
import { SignalCard } from '@components/signals/SignalCard';
import { formatPercentage } from '@utils/formatting';

export default function HistoryScreen() {
  const { theme } = useTheme();
  const { history, getStatistics } = useHistoryStore();
  const stats = getStatistics();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={{
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.md,
      }}
    >
      <Card style={{ marginBottom: theme.spacing.md }}>
        <Text style={[styles.statsTitle, { color: theme.colors.text }]}>Performance Overview</Text>
        
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stats.total}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
              Total Signals
            </Text>
          </View>

          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.colors.success }]}>
              {stats.profitable}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
              Profitable
            </Text>
          </View>

          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.colors.error }]}>{stats.losses}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Losses</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text
              style={[
                styles.statValue,
                { color: stats.winRate >= 50 ? theme.colors.success : theme.colors.error },
              ]}
            >
              {formatPercentage(stats.winRate, 1)}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Win Rate</Text>
          </View>

          <View style={styles.statItem}>
            <Text
              style={[
                styles.statValue,
                { color: stats.totalPips >= 0 ? theme.colors.success : theme.colors.error },
              ]}
            >
              {stats.totalPips >= 0 ? '+' : ''}
              {stats.totalPips.toFixed(1)}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
              Total Pips
            </Text>
          </View>
        </View>
      </Card>

      <Text style={[styles.historyTitle, { color: theme.colors.text }]}>Signal History</Text>

      {history.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
            No signal history yet. Start tracking your signals to see performance data here.
          </Text>
        </View>
      ) : (
        history.map((item) => (
          <View key={item.signal.id} style={{ marginBottom: theme.spacing.md }}>
            <SignalCard signal={item.signal} />
            {item.outcome && (
              <View
                style={[
                  styles.outcomeBar,
                  {
                    backgroundColor:
                      item.outcome === 'profit'
                        ? theme.colors.success
                        : item.outcome === 'loss'
                        ? theme.colors.error
                        : theme.colors.neutral,
                    marginTop: -theme.spacing.sm,
                    marginHorizontal: theme.spacing.md,
                    padding: theme.spacing.xs,
                    borderBottomLeftRadius: theme.borderRadius.lg,
                    borderBottomRightRadius: theme.borderRadius.lg,
                  },
                ]}
              >
                <Text style={styles.outcomeText}>
                  {item.outcome.toUpperCase()}
                  {item.pips && ` • ${item.pips >= 0 ? '+' : ''}${item.pips.toFixed(1)} pips`}
                </Text>
              </View>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  emptyState: {
    paddingVertical: 48,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  outcomeBar: {
    alignItems: 'center',
  },
  outcomeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
