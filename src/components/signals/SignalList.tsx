import React from 'react';
import { FlatList, View, Text, StyleSheet, RefreshControl } from 'react-native';
import { Signal } from '@types/signal.types';
import { SignalCard } from './SignalCard';
import { useTheme } from '@hooks/useTheme';

interface SignalListProps {
  signals: Signal[];
  onSignalPress?: (signal: Signal) => void;
  onRefresh?: () => void;
  refreshing?: boolean;
  emptyMessage?: string;
}

export const SignalList: React.FC<SignalListProps> = ({
  signals,
  onSignalPress,
  onRefresh,
  refreshing = false,
  emptyMessage = 'No signals available',
}) => {
  const { theme } = useTheme();

  const renderItem = ({ item }: { item: Signal }) => (
    <SignalCard signal={item} onPress={() => onSignalPress?.(item)} />
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
        {emptyMessage}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={signals}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={[
        styles.container,
        { paddingHorizontal: theme.spacing.md },
        signals.length === 0 && styles.emptyList,
      ]}
      ItemSeparatorComponent={() => <View style={{ height: theme.spacing.md }} />}
      ListEmptyComponent={renderEmpty}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
          />
        ) : undefined
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
