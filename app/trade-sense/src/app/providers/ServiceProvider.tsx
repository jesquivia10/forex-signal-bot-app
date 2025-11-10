import type { PropsWithChildren } from 'react';
import { createContext, useContext, useMemo } from 'react';

import type { MarketDataRepository, SettingsRepository, SignalsRepository } from '../../domain/repositories';
import {
  FetchLatestMarketDataUseCase,
  GenerateSignalsUseCase,
  GetSignalsHistoryUseCase,
  UpdateUserSettingsUseCase,
} from '../../domain/usecases';
import {
  AlphaVantageMarketDataRepository,
  AsyncSettingsRepository,
  AsyncSignalsRepository,
} from '../../data/repositories';
import { NotificationService } from '../../infrastructure/notifications/NotificationService';

type ServiceContextValue = {
  repositories: {
    marketData: MarketDataRepository;
    signals: SignalsRepository;
    settings: SettingsRepository;
  };
  usecases: {
    fetchMarketData: FetchLatestMarketDataUseCase;
    generateSignals: GenerateSignalsUseCase;
    getSignalsHistory: GetSignalsHistoryUseCase;
    updateUserSettings: UpdateUserSettingsUseCase;
  };
  infrastructure: {
    notifications: NotificationService;
  };
};

const ServicesContext = createContext<ServiceContextValue | undefined>(undefined);

export function ServicesProvider({ children }: PropsWithChildren) {
  const value = useMemo<ServiceContextValue>(() => {
    const marketDataRepository = new AlphaVantageMarketDataRepository();
    const signalsRepository = new AsyncSignalsRepository();
    const settingsRepository = new AsyncSettingsRepository();
    const notificationService = new NotificationService();

    const fetchMarketData = new FetchLatestMarketDataUseCase(marketDataRepository);
    const generateSignals = new GenerateSignalsUseCase({
      marketDataRepository,
      signalsRepository,
      settingsRepository,
      notificationService,
    });
    const getSignalsHistory = new GetSignalsHistoryUseCase(signalsRepository);
    const updateUserSettings = new UpdateUserSettingsUseCase(settingsRepository);

    return {
      repositories: {
        marketData: marketDataRepository,
        signals: signalsRepository,
        settings: settingsRepository,
      },
      usecases: {
        fetchMarketData,
        generateSignals,
        getSignalsHistory,
        updateUserSettings,
      },
      infrastructure: {
        notifications: notificationService,
      },
    };
  }, []);

  return <ServicesContext.Provider value={value}>{children}</ServicesContext.Provider>;
}

export function useServices() {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error('useServices must be used within a ServicesProvider');
  }
  return context;
}
