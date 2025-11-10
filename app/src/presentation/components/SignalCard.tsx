import React from 'react';
import styled from 'styled-components/native';

import { Signal } from '@domain/models/signal';

const Card = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;
  shadow-color: #000;
  shadow-opacity: 0.08;
  shadow-radius: 12px;
  elevation: 3;
`;

const HeaderRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const PairText = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const ConfidenceBadge = styled.View<{ level: Signal['confidence'] }>`
  padding: 6px 12px;
  border-radius: 999px;
  background-color: ${({ theme, level }) => {
    switch (level) {
      case 'high':
        return `${theme.colors.success}33`;
      case 'medium':
        return `${theme.colors.warning}33`;
      default:
        return `${theme.colors.mutedText}33`;
    }
  }};
`;

const ConfidenceText = styled.Text<{ level: Signal['confidence'] }>`
  color: ${({ theme, level }) => {
    switch (level) {
      case 'high':
        return theme.colors.success;
      case 'medium':
        return theme.colors.warning;
      default:
        return theme.colors.mutedText;
    }
  }};
  font-weight: 600;
  text-transform: uppercase;
  font-size: 12px;
`;

const Price = styled.Text`
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};
  margin-top: 12px;
`;

const Direction = styled.Text<{ direction: Signal['direction'] }>`
  color: ${({ theme, direction }) =>
    direction === 'buy' ? theme.colors.success : theme.colors.danger};
  font-weight: 600;
  margin-top: 4px;
  font-size: 16px;
  text-transform: uppercase;
`;

const MetaText = styled.Text`
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: 12px;
  margin-top: 4px;
`;

const RationaleList = styled.View`
  margin-top: 16px;
  gap: 8px;
`;

const RationaleItem = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: 8px;
`;

const Bullet = styled.Text`
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 700;
`;

const RationaleText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
  font-size: 14px;
  line-height: 20px;
`;

interface Props {
  signal: Signal;
}

export const SignalCard: React.FC<Props> = ({ signal }) => {
  const formattedDate = new Date(signal.createdAt).toLocaleString();
  return (
    <Card>
      <HeaderRow>
        <PairText>{signal.pair}</PairText>
        <ConfidenceBadge level={signal.confidence}>
          <ConfidenceText level={signal.confidence}>{signal.confidence}</ConfidenceText>
        </ConfidenceBadge>
      </HeaderRow>
      <Price>{signal.price.toFixed(4)}</Price>
      <Direction direction={signal.direction}>
        {signal.direction === 'buy' ? 'Posible Compra' : 'Posible Venta'}
      </Direction>
      <MetaText>Generada el {formattedDate}</MetaText>
      <RationaleList>
        {signal.rationale.map((item, index) => (
          <RationaleItem key={`${signal.id}-rationale-${index}`}>
            <Bullet>•</Bullet>
            <RationaleText>{item}</RationaleText>
          </RationaleItem>
        ))}
      </RationaleList>
    </Card>
  );
};
