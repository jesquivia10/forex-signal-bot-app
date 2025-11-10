import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import styled from 'styled-components/native';

import { Candle } from '@domain/models/candle';

const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 16px;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
`;

const Message = styled.Text`
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: 14px;
`;

interface Props {
  pair: string;
  candles: Candle[];
}

export const PriceChart: React.FC<Props> = ({ pair, candles }) => {
  const width = Dimensions.get('window').width - 48; // account for paddings
  const subset = candles.slice(0, 24).reverse();
  const labels = subset.map((candle) => new Date(candle.timestamp).toLocaleTimeString().slice(0, 5));
  const dataPoints = subset.map((candle) => candle.close);

  if (subset.length === 0) {
    return (
      <Container>
        <Title>{pair}</Title>
        <Message>Sin datos recientes disponibles</Message>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Precio reciente {pair}</Title>
      <LineChart
        data={{
          labels,
          datasets: [
            {
              data: dataPoints,
              color: () => '#2563EB',
              strokeWidth: 2,
            },
          ],
        }}
        width={width}
        height={220}
        withDots={false}
        withShadow
        chartConfig={{
          backgroundGradientFromOpacity: 0,
          backgroundGradientToOpacity: 0,
          color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
          decimalPlaces: 4,
        }}
        bezier
        style={{
          borderRadius: 16,
        }}
        yAxisSuffix=""
        yAxisInterval={1}
      />
    </Container>
  );
};
