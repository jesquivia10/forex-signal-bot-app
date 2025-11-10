import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Candle } from '@types/api.types';
import { useTheme } from '@hooks/useTheme';

interface PriceChartProps {
  candles: Candle[];
  width?: number;
  height?: number;
}

export const PriceChart: React.FC<PriceChartProps> = ({
  candles,
  width = Dimensions.get('window').width - 32,
  height = 220,
}) => {
  const { theme } = useTheme();

  if (!candles || candles.length === 0) {
    return (
      <View style={[styles.emptyContainer, { height }]}>
        <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
          No chart data available
        </Text>
      </View>
    );
  }

  // Get last 20 candles for better visualization
  const displayCandles = candles.slice(-20);
  const prices = displayCandles.map((c) => c.close);
  const labels = displayCandles.map((_, index) => (index % 5 === 0 ? index.toString() : ''));

  return (
    <View style={styles.container}>
      <LineChart
        data={{
          labels,
          datasets: [
            {
              data: prices,
            },
          ],
        }}
        width={width}
        height={height}
        chartConfig={{
          backgroundColor: theme.colors.card,
          backgroundGradientFrom: theme.colors.card,
          backgroundGradientTo: theme.colors.card,
          decimalPlaces: 5,
          color: (opacity = 1) => `rgba(0, 212, 170, ${opacity})`,
          labelColor: (opacity = 1) => theme.colors.textSecondary,
          style: {
            borderRadius: theme.borderRadius.lg,
          },
          propsForDots: {
            r: '2',
            strokeWidth: '1',
            stroke: theme.colors.primary,
          },
        }}
        bezier
        style={styles.chart}
        withInnerLines={true}
        withOuterLines={true}
        withVerticalLines={false}
        withHorizontalLines={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  chart: {
    borderRadius: 16,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
  },
});
