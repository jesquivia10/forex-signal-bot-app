import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ConfidenceLevel as ConfidenceLevelType } from '@types/signal.types';
import { useTheme } from '@hooks/useTheme';

interface ConfidenceLevelProps {
  level: ConfidenceLevelType;
  showLabel?: boolean;
}

export const ConfidenceLevel: React.FC<ConfidenceLevelProps> = ({ level, showLabel = true }) => {
  const { theme } = useTheme();

  const getColor = () => {
    switch (level) {
      case 'HIGH':
        return theme.colors.success;
      case 'MEDIUM':
        return theme.colors.warning;
      case 'LOW':
        return theme.colors.error;
    }
  };

  const getWidth = () => {
    switch (level) {
      case 'HIGH':
        return '100%';
      case 'MEDIUM':
        return '66%';
      case 'LOW':
        return '33%';
    }
  };

  return (
    <View style={styles.container}>
      {showLabel && (
        <Text style={[styles.label, { color: theme.colors.textSecondary }]}>Confidence</Text>
      )}
      <View style={styles.barContainer}>
        <View
          style={[
            styles.barBackground,
            {
              backgroundColor: theme.colors.surface,
              borderRadius: theme.borderRadius.sm,
            },
          ]}
        >
          <View
            style={[
              styles.barFill,
              {
                backgroundColor: getColor(),
                width: getWidth(),
                borderRadius: theme.borderRadius.sm,
              },
            ]}
          />
        </View>
        <Text style={[styles.levelText, { color: getColor() }]}>{level}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
  },
  barContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  barBackground: {
    flex: 1,
    height: 8,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
  },
  levelText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 8,
    minWidth: 60,
    textAlign: 'right',
  },
});
