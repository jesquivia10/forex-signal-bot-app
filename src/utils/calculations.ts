export const calculatePipValue = (
  currencyPair: string,
  lotSize: number = 1,
  accountCurrency: string = 'USD'
): number => {
  // Simplified pip value calculation
  // In reality, this depends on many factors including account currency
  const quoteCurrency = currencyPair.substring(3, 6);
  
  if (quoteCurrency === 'JPY') {
    return 0.01 * lotSize * 100000; // For JPY pairs, pip is 0.01
  }
  
  return 0.0001 * lotSize * 100000; // For most pairs, pip is 0.0001
};

export const calculatePriceChange = (
  currentPrice: number,
  previousPrice: number
): { change: number; changePercent: number } => {
  const change = currentPrice - previousPrice;
  const changePercent = (change / previousPrice) * 100;
  
  return { change, changePercent };
};

export const calculateRiskReward = (
  entryPrice: number,
  stopLoss: number,
  takeProfit: number
): number => {
  const risk = Math.abs(entryPrice - stopLoss);
  const reward = Math.abs(takeProfit - entryPrice);
  
  return reward / risk;
};

export const calculatePositionSize = (
  accountBalance: number,
  riskPercentage: number,
  stopLossPips: number,
  pipValue: number
): number => {
  const riskAmount = accountBalance * (riskPercentage / 100);
  return riskAmount / (stopLossPips * pipValue);
};

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

export const roundTo = (value: number, decimals: number): number => {
  const multiplier = Math.pow(10, decimals);
  return Math.round(value * multiplier) / multiplier;
};

export const interpolate = (
  value: number,
  inputRange: [number, number],
  outputRange: [number, number]
): number => {
  const [inputMin, inputMax] = inputRange;
  const [outputMin, outputMax] = outputRange;
  
  const ratio = (value - inputMin) / (inputMax - inputMin);
  return outputMin + ratio * (outputMax - outputMin);
};
