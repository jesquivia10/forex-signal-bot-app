export interface CurrencyPair {
  symbol: string;
  base: string;
  quote: string;
  name: string;
  isActive: boolean;
  minPipValue: number;
}

export class CurrencyPairEntity implements CurrencyPair {
  symbol: string;
  base: string;
  quote: string;
  name: string;
  isActive: boolean;
  minPipValue: number;

  constructor(data: CurrencyPair) {
    this.symbol = data.symbol;
    this.base = data.base;
    this.quote = data.quote;
    this.name = data.name;
    this.isActive = data.isActive;
    this.minPipValue = data.minPipValue;
  }

  getDisplayName(): string {
    return `${this.base}/${this.quote}`;
  }

  getApiSymbol(): string {
    return this.symbol;
  }

  isValid(): boolean {
    return this.base.length === 3 && this.quote.length === 3;
  }

  calculatePips(priceChange: number): number {
    return Math.round(priceChange / this.minPipValue);
  }
}
