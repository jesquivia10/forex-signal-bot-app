import React, { useCallback } from 'react';
import { RefreshControl } from 'react-native';
import styled from 'styled-components/native';

import { useAppDispatch, useAppSelector } from '@application/hooks';
import { selectActiveSignals } from '@application/store/signalsSlice';
import {
  refreshMarketData,
  selectIndicatorsByPair,
  selectMarketState,
  selectPricesByPair,
} from '@application/store/marketSlice';
import { selectPreferences } from '@application/store/preferencesSlice';
import { ScreenScroll } from '@presentation/components/ScreenContainer';
import { SignalCard } from '@presentation/components/SignalCard';
import { SummaryTile } from '@presentation/components/SummaryTile';
import { PriceChart } from '@presentation/components/PriceChart';
import { IndicatorSummary } from '@presentation/components/IndicatorSummary';
import { DEFAULT_CURRENCY_PAIRS } from '@config/tradingPairs';

const Header = styled.View`
  margin-bottom: 24px;
  gap: 12px;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 24px;
  font-weight: 700;
`;

const Subtitle = styled.Text`
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: 14px;
`;

const SummaryRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 24px;
  gap: 12px;
  justify-content: space-between;
`;

const EmptyState = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 16px;
  padding: 24px;
  align-items: center;
  margin-bottom: 16px;
`;

const EmptyText = styled.Text`
  color: ${({ theme }) => theme.colors.mutedText};
  text-align: center;
`;

const SectionTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 18px;
  font-weight: 600;
  margin-vertical: 12px;
`;

export default function DashboardScreen() {
  const dispatch = useAppDispatch();
  const signals = useAppSelector(selectActiveSignals);
  const marketState = useAppSelector(selectMarketState);
  const pricesByPair = useAppSelector(selectPricesByPair);
  const indicatorsByPair = useAppSelector(selectIndicatorsByPair);
  const preferences = useAppSelector(selectPreferences);

  const onRefresh = useCallback(() => {
    dispatch(refreshMarketData());
  }, [dispatch]);

  const monitoredPairs = preferences.monitoredPairs;

  const lastUpdatedLabel = marketState.lastUpdated
    ? new Date(marketState.lastUpdated).toLocaleTimeString()
    : '—';

  return (
    <ScreenScroll
      refreshControl={
        <RefreshControl refreshing={marketState.status === 'loading'} onRefresh={onRefresh} />
      }>
      <Header>
        <Title>TradeSense</Title>
        <Subtitle>Señales educativas basadas en Bollinger, RSI y medias móviles</Subtitle>
      </Header>

      <SummaryRow>
        <SummaryTile label="Señales activas" value={signals.length.toString()} />
        <SummaryTile label="Última actualización" value={lastUpdatedLabel} />
        <SummaryTile label="Pares monitoreados" value={monitoredPairs.length.toString()} />
      </SummaryRow>

      {signals.length === 0 ? (
        <EmptyState>
          <EmptyText>
            No hay señales destacadas en este momento. Ajusta tus parámetros o espera la próxima
            actualización.
          </EmptyText>
        </EmptyState>
      ) : (
        <>
          <SectionTitle>Señales detectadas</SectionTitle>
          {signals.map((signal) => (
            <SignalCard key={signal.id} signal={signal} />
          ))}
        </>
      )}

      <SectionTitle>Pares monitoreados</SectionTitle>
      {monitoredPairs.map((pair) => {
        const pairLabel = DEFAULT_CURRENCY_PAIRS[pair]?.label ?? pair;
        const candles = pricesByPair[pair] ?? [];
        const indicators = indicatorsByPair[pair];

        return (
          <React.Fragment key={pair}>
            <PriceChart pair={pairLabel} candles={candles} />
            {indicators && <IndicatorSummary indicators={indicators} />}
          </React.Fragment>
        );
      })}
    </ScreenScroll>
  );
}
