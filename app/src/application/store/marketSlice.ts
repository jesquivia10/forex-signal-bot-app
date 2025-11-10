import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Candle } from '@domain/models/candle';
import { DEFAULT_PAIR_ORDER } from '@config/tradingPairs';
import { MarketRepository } from '@data/repositories/marketRepository';
import { generateSignalsForPair } from '@domain/usecases/generateSignals';
import { Signal } from '@domain/models/signal';
import { IndicatorSet } from '@domain/models/technicals';
import { RootState } from './store';

const marketRepository = new MarketRepository();

export interface MarketState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  lastUpdated?: string;
  error?: string;
  pricesByPair: Record<string, Candle[]>;
  indicatorsByPair: Record<string, IndicatorSet>;
}

const initialState: MarketState = {
  status: 'idle',
  pricesByPair: {},
  indicatorsByPair: {},
};

export const refreshMarketData = createAsyncThunk<
  { pricesByPair: Record<string, Candle[]>; indicatorsByPair: Record<string, IndicatorSet>; signals: Signal[]; refreshedAt: string },
  void,
  { state: RootState }
>('market/refreshMarketData', async (_, { getState }) => {
  const state = getState();
  const preferences = state.preferences.current;
  const pairs =
    preferences?.monitoredPairs && preferences.monitoredPairs.length > 0
      ? preferences.monitoredPairs
      : DEFAULT_PAIR_ORDER;
  const interval = preferences?.notifications.intervalMinutes ?? '15min';

  const pricesByPair = await marketRepository.fetchLatestSnapshots(pairs, interval);

  const indicatorsByPair: Record<string, IndicatorSet> = {};
  const signals: Signal[] = [];

  pairs.forEach((pair) => {
    const candles = pricesByPair[pair] ?? [];
    const { signal, indicators } = generateSignalsForPair(pair, candles, preferences);
    indicatorsByPair[pair] = indicators;
    if (signal) {
      signals.push(signal);
    }
  });

  return {
    pricesByPair,
    indicatorsByPair,
    signals,
    refreshedAt: new Date().toISOString(),
  };
});

const marketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(refreshMarketData.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(refreshMarketData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pricesByPair = action.payload.pricesByPair;
        state.indicatorsByPair = action.payload.indicatorsByPair;
        state.lastUpdated = action.payload.refreshedAt;
      })
      .addCase(refreshMarketData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'No se pudo actualizar el mercado';
      });
  },
});

export const selectMarketState = (state: RootState) => state.market;
export const selectPricesByPair = (state: RootState) => state.market.pricesByPair;
export const selectIndicatorsByPair = (state: RootState) => state.market.indicatorsByPair;

export default marketSlice.reducer;
