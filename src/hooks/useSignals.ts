import { useEffect } from 'react';
import { useForexTimeSeries } from './useForexData';
import { useSignalsStore } from '@store/signalsStore';
import { useSettingsStore } from '@store/settingsStore';
import { SignalGenerator } from '@core/indicators/SignalGenerator';
import { Timeframe } from '@types/signal.types';

export const useSignalGeneration = (currencyPair: string, timeframe: Timeframe) => {
  const { data: candles, isLoading, error } = useForexTimeSeries(currencyPair, timeframe);
  const { setSignal, setLoading, setError } = useSignalsStore();
  const settings = useSettingsStore();

  useEffect(() => {
    setLoading(currencyPair, isLoading);
  }, [isLoading, currencyPair, setLoading]);

  useEffect(() => {
    if (error) {
      setError(currencyPair, error.message);
      return;
    }

    if (!candles || candles.length === 0) {
      return;
    }

    try {
      const generator = new SignalGenerator({
        rsiPeriod: settings.rsiPeriod,
        rsiOverbought: settings.rsiOverbought,
        rsiOversold: settings.rsiOversold,
        bbPeriod: settings.bbPeriod,
        bbStdDev: settings.bbStdDev,
        smaPeriods: settings.smaPeriods,
        emaPeriods: settings.emaPeriods,
        minConfidenceLevel: settings.minConfidenceLevel,
      });

      const signal = generator.generateSignal(candles, currencyPair);
      setSignal(currencyPair, signal, candles);
    } catch (err) {
      setError(currencyPair, err instanceof Error ? err.message : 'Unknown error');
    }
  }, [candles, error, currencyPair, setSignal, setError, settings]);

  return {
    isLoading,
    error: error?.message,
  };
};

export const useBatchSignalGeneration = (currencyPairs: string[], timeframe: Timeframe) => {
  const { setAnalyzing } = useSignalsStore();

  useEffect(() => {
    if (currencyPairs.length > 0) {
      setAnalyzing(true);
    }
  }, [currencyPairs, setAnalyzing]);

  // Generate signals for each pair
  const results = currencyPairs.map((pair) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useSignalGeneration(pair, timeframe);
  });

  const allLoaded = results.every((r) => !r.isLoading);

  useEffect(() => {
    if (allLoaded) {
      setAnalyzing(false);
    }
  }, [allLoaded, setAnalyzing]);

  return {
    isAnalyzing: !allLoaded,
    results,
  };
};
