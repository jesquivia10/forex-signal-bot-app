import { Signal, SignalType, ConfidenceLevel } from '@types/signal.types';

export class SignalEntity implements Signal {
  id: string;
  currencyPair: string;
  type: SignalType;
  confidence: ConfidenceLevel;
  timestamp: Date;
  price: number;
  indicators: Signal['indicators'];
  reason: string;
  metadata?: Signal['metadata'];

  constructor(data: Signal) {
    this.id = data.id;
    this.currencyPair = data.currencyPair;
    this.type = data.type;
    this.confidence = data.confidence;
    this.timestamp = data.timestamp;
    this.price = data.price;
    this.indicators = data.indicators;
    this.reason = data.reason;
    this.metadata = data.metadata;
  }

  getConfidenceColor(): string {
    switch (this.confidence) {
      case 'HIGH':
        return '#10B981';
      case 'MEDIUM':
        return '#F59E0B';
      case 'LOW':
        return '#EF4444';
    }
  }

  getTypeColor(): string {
    switch (this.type) {
      case 'BUY':
        return '#10B981';
      case 'SELL':
        return '#EF4444';
      case 'NEUTRAL':
        return '#6B7280';
    }
  }

  getAge(): number {
    return Date.now() - this.timestamp.getTime();
  }

  isRecent(thresholdMinutes: number = 30): boolean {
    return this.getAge() < thresholdMinutes * 60 * 1000;
  }

  getSummary(): string {
    return `${this.type} signal for ${this.currencyPair} at ${this.price} (${this.confidence} confidence)`;
  }
}
