export const isValidCurrencyPair = (pair: string): boolean => {
  return /^[A-Z]{6}$/.test(pair);
};

export const isValidRSIPeriod = (period: number): boolean => {
  return Number.isInteger(period) && period >= 2 && period <= 50;
};

export const isValidRSILevel = (level: number): boolean => {
  return level >= 0 && level <= 100;
};

export const isValidBBPeriod = (period: number): boolean => {
  return Number.isInteger(period) && period >= 2 && period <= 100;
};

export const isValidStdDev = (stdDev: number): boolean => {
  return stdDev > 0 && stdDev <= 5;
};

export const isValidMAPeriod = (period: number): boolean => {
  return Number.isInteger(period) && period >= 2 && period <= 200;
};

export const isValidUpdateInterval = (interval: number): boolean => {
  return Number.isInteger(interval) && interval >= 1 && interval <= 60;
};

export const validateSettings = (settings: Record<string, unknown>): string[] => {
  const errors: string[] = [];

  if (typeof settings.rsiPeriod === 'number' && !isValidRSIPeriod(settings.rsiPeriod)) {
    errors.push('RSI period must be between 2 and 50');
  }

  if (typeof settings.rsiOverbought === 'number' && !isValidRSILevel(settings.rsiOverbought)) {
    errors.push('RSI overbought level must be between 0 and 100');
  }

  if (typeof settings.rsiOversold === 'number' && !isValidRSILevel(settings.rsiOversold)) {
    errors.push('RSI oversold level must be between 0 and 100');
  }

  if (typeof settings.bbPeriod === 'number' && !isValidBBPeriod(settings.bbPeriod)) {
    errors.push('Bollinger Bands period must be between 2 and 100');
  }

  if (typeof settings.bbStdDev === 'number' && !isValidStdDev(settings.bbStdDev)) {
    errors.push('Bollinger Bands standard deviation must be between 0 and 5');
  }

  return errors;
};
