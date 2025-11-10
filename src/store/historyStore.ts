import { create } from 'zustand';
import { SignalHistory } from '@types/signal.types';
import { StorageService, STORAGE_KEYS } from '@services/storage/storage';
import { APP_CONFIG } from '@config/api.config';

interface HistoryState {
  history: SignalHistory[];
  isLoading: boolean;
  
  addSignalToHistory: (signalHistory: SignalHistory) => void;
  updateSignalOutcome: (
    signalId: string,
    outcome: 'profit' | 'loss' | 'neutral',
    pips?: number
  ) => void;
  removeFromHistory: (signalId: string) => void;
  clearHistory: () => void;
  loadHistory: () => Promise<void>;
  saveHistory: () => Promise<void>;
  getStatistics: () => {
    total: number;
    profitable: number;
    losses: number;
    winRate: number;
    totalPips: number;
  };
}

export const useHistoryStore = create<HistoryState>((set, get) => ({
  history: [],
  isLoading: false,

  addSignalToHistory: (signalHistory: SignalHistory) => {
    const history = [signalHistory, ...get().history];
    
    // Limit history size
    if (history.length > APP_CONFIG.MAX_SIGNAL_HISTORY) {
      history.pop();
    }

    set({ history });
    get().saveHistory();
  },

  updateSignalOutcome: (
    signalId: string,
    outcome: 'profit' | 'loss' | 'neutral',
    pips?: number
  ) => {
    const history = get().history.map((item) => {
      if (item.signal.id === signalId) {
        return {
          ...item,
          outcome,
          closedAt: new Date(),
          pips,
        };
      }
      return item;
    });

    set({ history });
    get().saveHistory();
  },

  removeFromHistory: (signalId: string) => {
    const history = get().history.filter((item) => item.signal.id !== signalId);
    set({ history });
    get().saveHistory();
  },

  clearHistory: () => {
    set({ history: [] });
    get().saveHistory();
  },

  loadHistory: async () => {
    set({ isLoading: true });
    const saved = await StorageService.getItem<SignalHistory[]>(STORAGE_KEYS.SIGNAL_HISTORY);
    if (saved) {
      // Reconstitute dates
      const history = saved.map((item) => ({
        ...item,
        signal: {
          ...item.signal,
          timestamp: new Date(item.signal.timestamp),
        },
        closedAt: item.closedAt ? new Date(item.closedAt) : undefined,
      }));
      set({ history, isLoading: false });
    } else {
      set({ isLoading: false });
    }
  },

  saveHistory: async () => {
    await StorageService.setItem(STORAGE_KEYS.SIGNAL_HISTORY, get().history);
  },

  getStatistics: () => {
    const { history } = get();
    const closedSignals = history.filter((item) => item.outcome);

    const profitable = closedSignals.filter((item) => item.outcome === 'profit').length;
    const losses = closedSignals.filter((item) => item.outcome === 'loss').length;
    const total = closedSignals.length;
    const winRate = total > 0 ? (profitable / total) * 100 : 0;
    const totalPips = closedSignals.reduce((sum, item) => sum + (item.pips || 0), 0);

    return {
      total,
      profitable,
      losses,
      winRate,
      totalPips,
    };
  },
}));
