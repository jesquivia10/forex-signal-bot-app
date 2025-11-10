import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@hooks/useTheme';
import { useSignalsStore } from '@store/signalsStore';
import { useSettingsStore } from '@store/settingsStore';
import { useBatchSignalGeneration } from '@hooks/useSignals';
import { useNotifications } from '@hooks/useNotifications';
import { SignalList } from '@components/signals/SignalList';
import { Button } from '@components/common/Button';
import { Signal } from '@types/signal.types';
import { LEGAL_DISCLAIMER } from '@config/constants';

export default function HomeScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const { activeSignals, isAnalyzing } = useSignalsStore();
  const { favoritePairs, defaultTimeframe, onboardingCompleted, updateSettings } = useSettingsStore();
  const { requestPermissions, sendBulkNotification } = useNotifications();
  const [showDisclaimer, setShowDisclaimer] = useState(!onboardingCompleted);
  const [refreshing, setRefreshing] = useState(false);

  // Generate signals for favorite pairs
  const { isAnalyzing: generating } = useBatchSignalGeneration(favoritePairs, defaultTimeframe);

  useEffect(() => {
    // Request notification permissions on first launch
    if (onboardingCompleted) {
      requestPermissions();
    }
  }, [onboardingCompleted]);

  useEffect(() => {
    // Send notifications for new high-confidence signals
    const highConfidenceSignals = activeSignals.filter((s) => s.confidence === 'HIGH');
    if (highConfidenceSignals.length > 0 && onboardingCompleted) {
      sendBulkNotification(highConfidenceSignals);
    }
  }, [activeSignals.length]);

  const handleAcceptDisclaimer = () => {
    updateSettings({ onboardingCompleted: true });
    setShowDisclaimer(false);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    // The batch signal generation will automatically refresh
    setTimeout(() => setRefreshing(false), 2000);
  };

  const handleSignalPress = (signal: Signal) => {
    router.push(`/signal/${signal.id}`);
  };

  if (showDisclaimer) {
    return (
      <View style={[styles.disclaimerContainer, { backgroundColor: theme.colors.background }]}>
        <ScrollView
          contentContainerStyle={[
            styles.disclaimerContent,
            { paddingHorizontal: theme.spacing.lg },
          ]}
        >
          <Text style={[styles.disclaimerTitle, { color: theme.colors.text }]}>
            Welcome to TradeSense
          </Text>
          <Text style={[styles.disclaimerText, { color: theme.colors.textSecondary }]}>
            {LEGAL_DISCLAIMER}
          </Text>
          <Button
            title="I Understand and Accept"
            onPress={handleAcceptDisclaimer}
            style={{ marginTop: theme.spacing.lg }}
          />
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { padding: theme.spacing.md }]}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Trading Signals
        </Text>
        {(generating || isAnalyzing) && (
          <View style={styles.loadingIndicator}>
            <ActivityIndicator size="small" color={theme.colors.primary} />
            <Text style={[styles.loadingText, { color: theme.colors.textSecondary }]}>
              Analyzing...
            </Text>
          </View>
        )}
      </View>

      {activeSignals.length === 0 && !generating ? (
        <View style={styles.emptyState}>
          <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
            No Active Signals
          </Text>
          <Text style={[styles.emptyMessage, { color: theme.colors.textSecondary }]}>
            We're monitoring the market. New signals will appear here when conditions are met.
          </Text>
          <Button
            title="Refresh"
            onPress={handleRefresh}
            style={{ marginTop: theme.spacing.lg }}
          />
        </View>
      ) : (
        <SignalList
          signals={activeSignals}
          onSignalPress={handleSignalPress}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          emptyMessage="No signals match your criteria"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  loadingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  disclaimerContainer: {
    flex: 1,
  },
  disclaimerContent: {
    flexGrow: 1,
    paddingTop: 48,
    paddingBottom: 32,
  },
  disclaimerTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
  },
  disclaimerText: {
    fontSize: 14,
    lineHeight: 22,
  },
});
