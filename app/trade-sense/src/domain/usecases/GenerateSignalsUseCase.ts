import { SUPPORTED_PAIRS } from '../../config/constants';
import type { CandleInterval, CurrencyPair, Signal, UserSettings } from '../entities';
import { parsePair } from '../entities/CurrencyPair';
import type { MarketDataRepository, SettingsRepository, SignalsRepository } from '../repositories';
import { IndicatorEngine, SignalEngine } from '../services';

export interface SignalNotificationPort {
  notify(signal: Signal, settings: UserSettings): Promise<void>;
}

type GenerateSignalsParams = {
  pairs?: string[];
  interval?: CandleInterval;
};

export class GenerateSignalsUseCase {
  private readonly signalEngine: SignalEngine;

  constructor(
    private readonly dependencies: {
      marketDataRepository: MarketDataRepository;
      signalsRepository: SignalsRepository;
      settingsRepository: SettingsRepository;
      notificationService?: SignalNotificationPort;
    },
  ) {
    this.signalEngine = new SignalEngine();
  }

  async execute(params: GenerateSignalsParams = {}): Promise<Signal[]> {
    const settings = await this.dependencies.settingsRepository.get().catch(() => this.defaultSettings());
    this.signalEngine.updateIndicatorParameters(settings.indicatorParameters);

    const preferredPairs =
      settings.preferredPairs && settings.preferredPairs.length > 0
        ? settings.preferredPairs
        : [...SUPPORTED_PAIRS];
    const targetPairs = params.pairs ?? preferredPairs;
    const interval = params.interval ?? settings.autoRefreshInterval;

    const allSignals: Signal[] = [];

    for (const pairSymbol of targetPairs) {
      try {
        const pair = this.resolvePair(pairSymbol);
        const candles = await this.dependencies.marketDataRepository.getIntradayCandles({
          pair,
          interval,
          outputSize: 'compact',
        });
        const signals = this.signalEngine.generateSignals({ pair, candles });
        if (signals.length > 0) {
          await this.dependencies.signalsRepository.saveMany(signals);
          if (settings.notificationPreference.enabled && this.dependencies.notificationService) {
            for (const signal of signals) {
              await this.dependencies.notificationService.notify(signal, settings);
            }
          }
          allSignals.push(...signals);
        }
      } catch (error) {
        console.warn(`[GenerateSignalsUseCase] Failed for pair ${pairSymbol}`, error);
      }
    }

    return allSignals.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }

  private resolvePair(symbol: string): CurrencyPair {
    if (symbol.includes('/')) {
      return parsePair(symbol);
    }
    if (symbol.length === 6) {
      return {
        base: symbol.slice(0, 3).toUpperCase(),
        quote: symbol.slice(3).toUpperCase(),
      };
    }
    throw new Error(`Unsupported pair symbol: ${symbol}`);
  }

  private defaultSettings(): UserSettings {
    return {
      preferredPairs: [...SUPPORTED_PAIRS],
      indicatorParameters: IndicatorEngine.defaultParameters(),
      notificationPreference: {
        enabled: false,
        intervalMinutes: 15,
      },
      autoRefreshInterval: '15min',
    };
  }
}
