export type BollingerBands = {
  upper: number;
  middle: number;
  lower: number;
};

export type MovingAverages = {
  smaFast: number;
  smaSlow: number;
  emaFast: number;
  emaSlow: number;
};

export type IndicatorSnapshot = {
  timestamp: string;
  price: number;
  bollinger: BollingerBands;
  rsi: number;
  movingAverages: MovingAverages;
};
