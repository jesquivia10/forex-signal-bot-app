import { Candle } from '@types/api.types';

export class CandleEntity implements Candle {
  timestamp: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;

  constructor(data: Candle) {
    this.timestamp = data.timestamp;
    this.open = data.open;
    this.high = data.high;
    this.low = data.low;
    this.close = data.close;
    this.volume = data.volume;
  }

  isBullish(): boolean {
    return this.close > this.open;
  }

  isBearish(): boolean {
    return this.close < this.open;
  }

  getBodySize(): number {
    return Math.abs(this.close - this.open);
  }

  getWickSize(): number {
    const upperWick = this.high - Math.max(this.open, this.close);
    const lowerWick = Math.min(this.open, this.close) - this.low;
    return upperWick + lowerWick;
  }

  getRange(): number {
    return this.high - this.low;
  }

  getTypicalPrice(): number {
    return (this.high + this.low + this.close) / 3;
  }

  isValidCandle(): boolean {
    return (
      this.high >= this.open &&
      this.high >= this.close &&
      this.low <= this.open &&
      this.low <= this.close &&
      this.high >= this.low
    );
  }
}
