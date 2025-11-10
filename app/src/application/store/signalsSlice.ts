import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Signal } from '@domain/models/signal';
import { SignalRepository } from '@data/repositories/signalRepository';
import { refreshMarketData } from './marketSlice';
import { RootState } from './store';

const signalRepository = new SignalRepository();

export interface SignalsState {
  activeSignals: Signal[];
  history: Signal[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
}

const initialState: SignalsState = {
  activeSignals: [],
  history: [],
  status: 'idle',
};

export const loadSignalHistory = createAsyncThunk('signals/loadHistory', async () => {
  const stored = await signalRepository.loadHistory();
  return stored;
});

const signalsSlice = createSlice({
  name: 'signals',
  initialState,
  reducers: {
    clearActiveSignals(state) {
      state.activeSignals = [];
    },
    appendToHistory(state, action: PayloadAction<Signal>) {
      state.history.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSignalHistory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadSignalHistory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.history = action.payload;
      })
      .addCase(loadSignalHistory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'No se pudo cargar el historial de señales';
      })
      .addCase(refreshMarketData.fulfilled, (state, action) => {
        state.activeSignals = action.payload.signals;
        if (action.payload.signals.length) {
          const updatedHistory = [...action.payload.signals, ...state.history].slice(0, 100);
          state.history = updatedHistory;
          signalRepository.persistHistory(updatedHistory).catch((error) =>
            console.warn('[signalsSlice] persistHistory error', error),
          );
        }
      });
  },
});

export const { clearActiveSignals, appendToHistory } = signalsSlice.actions;
export const selectActiveSignals = (state: RootState) => state.signals.activeSignals;
export const selectSignalHistory = (state: RootState) => state.signals.history;

export default signalsSlice.reducer;
