import React from 'react';
import styled from 'styled-components/native';

import { IndicatorSet } from '@domain/models/technicals';

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

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-vertical: 6px;
`;

const Label = styled.Text`
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: 14px;
`;

const Value = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  font-size: 14px;
`;

const Divider = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.divider};
  margin-vertical: 8px;
`;

interface Props {
  indicators: IndicatorSet;
}

export const IndicatorSummary: React.FC<Props> = ({ indicators }) => {
  const rows = [
    { label: 'SMA 20', value: indicators.sma20 },
    { label: 'SMA 50', value: indicators.sma50 },
    { label: 'EMA 20', value: indicators.ema20 },
    { label: 'EMA 50', value: indicators.ema50 },
    { label: 'RSI 14', value: indicators.rsi14 },
    { label: 'Bollinger Sup.', value: indicators.bollinger.upper },
    { label: 'Bollinger Med.', value: indicators.bollinger.middle },
    { label: 'Bollinger Inf.', value: indicators.bollinger.lower },
  ];

  return (
    <Container>
      <Title>Indicadores Técnicos</Title>
      {rows.map(({ label, value }, index) => (
        <React.Fragment key={label}>
          <Row>
            <Label>{label}</Label>
            <Value>{value !== null ? value.toFixed(4) : '—'}</Value>
          </Row>
          {index !== rows.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </Container>
  );
};
