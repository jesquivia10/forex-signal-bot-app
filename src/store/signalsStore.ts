import { create } from 'zustand';
import { Signal } from '@types/signal.types';
import { Candle } from '@types/api.types';

interface SignalData {
  signal: Signal | null;
  candles: Candle[];
  lastUpdate: Date;
  isLoading: boolean;
  error: string | null;
}

interface SignalsState {
  signals: Map<string, SignalData>;
  activeSignals: Signal[];
  isAnalyzing: boolean;
  
  setSignal: (currencyPair: string, signal: Signal | null, candles: Candle[]) => void;
  setLoading: (currencyPair: string, isLoading: boolean) => void;
  setError: (currencyPair: string, error: string | null) => void;
  clearSignal: (currencyPair: string) => void;
  clearAllSignals: () => void;
  getSignalData: (currencyPair: string) => SignalData | undefined;
  updateActiveSignals: () => void;
  setAnalyzing: (isAnalyzing: boolean) => void;
}

export const useSignalsStore = create<SignalsState>((set, get) => ({
  signals: new Map(),
  activeSignals: [],
  isAnalyzing: false,

  setSignal: (currencyPair: string, signal: Signal | null, candles: Candle[]) => {
    const signals = new Map(get().signals);
    signals.set(currencyPair, {
      signal,
      candles,
      lastUpdate: new Date(),
      isLoading: false,
      error: null,
    });
    set({ signals });
    get().updateActiveSignals();
  },

  setLoading: (currencyPair: string, isLoading: boolean) => {
    const signals = new Map(get().signals);
    const existing = signals.get(currencyPair);
    signals.set(currencyPair, {
      ...existing,
      signal: existing?.signal || null,
      candles: existing?.candles || [],
      lastUpdate: existing?.lastUpdate || new Date(),
      isLoading,
      error: null,
    });
    set({ signals });
  },

  setError: (currencyPair: string, error: string | null) => {
    const signals = new Map(get().signals);
    const existing = signals.get(currencyPair);
    signals.set(currencyPair, {
      ...existing,
      signal: existing?.signal || null,
      candles: existing?.candles || [],
      lastUpdate: existing?.lastUpdate || new Date(),
      isLoading: false,
      error,
    });
    set({ signals });
  },

  clearSignal: (currencyPair: string) => {
    const signals = new Map(get().signals);
    signals.delete(currencyPair);
    set({ signals });
    get().updateActiveSignals();
  },

  clearAllSignals: () => {
    set({ signals: new Map(), activeSignals: [] });
  },

  getSignalData: (currencyPair: string) => {
    return get().signals.get(currencyPair);
  },

  updateActiveSignals: () => {
    const signals = get().signals;
    const active: Signal[] = [];
    
    signals.forEach((data) => {
      if (data.signal && data.signal.type !== 'NEUTRAL') {
        active.push(data.signal);
      }
    });

    // Sort by confidence and timestamp
    active.sort((a, b) => {
      const confidenceOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 };
      const confDiff = confidenceOrder[b.confidence] - confidenceOrder[a.confidence];
      if (confDiff !== 0) return confDiff;
      return b.timestamp.getTime() - a.timestamp.getTime();
    });

    set({ activeSignals: active });
  },

  setAnalyzing: (isAnalyzing: boolean) => {
    set({ isAnalyzing });
  },
}));
