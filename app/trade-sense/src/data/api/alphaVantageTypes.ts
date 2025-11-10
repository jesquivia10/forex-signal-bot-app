export type AlphaVantageIntradayResponse = {
  'Meta Data'?: {
    '1. Information': string;
    '2. From Symbol': string;
    '3. To Symbol': string;
    '4. Last Refreshed': string;
    '5. Interval': string;
    '6. Output Size': string;
    '7. Time Zone': string;
  };
  'Time Series FX (1min)'?: Record<string, AlphaVantageQuote>;
  'Time Series FX (5min)'?: Record<string, AlphaVantageQuote>;
  'Time Series FX (15min)'?: Record<string, AlphaVantageQuote>;
  'Time Series FX (30min)'?: Record<string, AlphaVantageQuote>;
  'Time Series FX (60min)'?: Record<string, AlphaVantageQuote>;
  Note?: string;
  Information?: string;
  'Error Message'?: string;
};

export type AlphaVantageQuote = {
  '1. open': string;
  '2. high': string;
  '3. low': string;
  '4. close': string;
};
