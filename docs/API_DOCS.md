# TradeSense API Documentation

This document describes the internal APIs, data structures, and integration points in TradeSense.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Core Domain](#core-domain)
3. [Technical Indicators](#technical-indicators)
4. [Services](#services)
5. [State Management](#state-management)
6. [Hooks](#hooks)
7. [External APIs](#external-apis)

## Architecture Overview

TradeSense follows Clean Architecture with four main layers:

```
Presentation → Application → Domain → Infrastructure
```

- **Presentation**: React components, screens
- **Application**: State management, business logic orchestration
- **Domain**: Pure business logic, calculations
- **Infrastructure**: External services (API, storage, notifications)

## Core Domain

### Types

#### Signal

```typescript
interface Signal {
  id: string;
  currencyPair: string;
  type: SignalType; // 'BUY' | 'SELL' | 'NEUTRAL'
  confidence: ConfidenceLevel; // 'LOW' | 'MEDIUM' | 'HIGH'
  timestamp: Date;
  price: number;
  indicators: SignalIndicators;
  reason: string;
  metadata?: SignalMetadata;
}
```

#### SignalIndicators

```typescript
interface SignalIndicators {
  rsi: {
    value: number;
    condition: 'overbought' | 'oversold' | 'neutral';
  };
  bollingerBands: {
    upper: number;
    middle: number;
    lower: number;
    position: 'above' | 'below' | 'inside';
  };
  movingAverages: {
    sma20: number;
    sma50: number;
    ema20: number;
    ema50: number;
    trend: 'bullish' | 'bearish' | 'neutral';
  };
}
```

#### Candle

```typescript
interface Candle {
  timestamp: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}
```

### Entities

#### CurrencyPairEntity

```typescript
class CurrencyPairEntity {
  symbol: string;
  base: string;
  quote: string;
  name: string;
  isActive: boolean;
  minPipValue: number;

  getDisplayName(): string;
  getApiSymbol(): string;
  isValid(): boolean;
  calculatePips(priceChange: number): number;
}
```

#### SignalEntity

```typescript
class SignalEntity implements Signal {
  // ... Signal properties

  getConfidenceColor(): string;
  getTypeColor(): string;
  getAge(): number;
  isRecent(thresholdMinutes?: number): boolean;
  getSummary(): string;
}
```

#### CandleEntity

```typescript
class CandleEntity implements Candle {
  // ... Candle properties

  isBullish(): boolean;
  isBearish(): boolean;
  getBodySize(): number;
  getWickSize(): number;
  getRange(): number;
  getTypicalPrice(): number;
  isValidCandle(): boolean;
}
```

## Technical Indicators

### BollingerBands

Calculate Bollinger Bands for a series of candles.

```typescript
class BollingerBands {
  constructor(period: number = 20, standardDeviations: number = 2);

  calculate(candles: Candle[]): BollingerBandsResult[];
  calculateLast(candles: Candle[]): BollingerBandsResult | null;
  isPriceTouchingUpper(price: number, bands: BollingerBandsResult, threshold?: number): boolean;
  isPriceTouchingLower(price: number, bands: BollingerBandsResult, threshold?: number): boolean;
  getPricePosition(price: number, bands: BollingerBandsResult): 'above' | 'below' | 'inside';
}

interface BollingerBandsResult {
  upper: number;
  middle: number;
  lower: number;
  bandwidth: number;
}
```

**Example Usage:**

```typescript
const bb = new BollingerBands(20, 2);
const result = bb.calculateLast(candles);

if (result && bb.isPriceTouchingLower(currentPrice, result)) {
  // Price is touching lower band
}
```

### RSI (Relative Strength Index)

Calculate RSI indicator.

```typescript
class RSI {
  constructor(period: number = 14, overboughtLevel: number = 70, oversoldLevel: number = 30);

  calculate(candles: Candle[]): number[];
  calculateLast(candles: Candle[]): number | null;
  calculateLastWithCondition(candles: Candle[]): RSIResult | null;
  getCondition(rsiValue: number): 'overbought' | 'oversold' | 'neutral';
  isOverbought(rsiValue: number): boolean;
  isOversold(rsiValue: number): boolean;
  isDivergence(rsiValues: number[], priceValues: number[], lookback?: number): boolean;
}

interface RSIResult {
  value: number;
  condition: 'overbought' | 'oversold' | 'neutral';
}
```

**Example Usage:**

```typescript
const rsi = new RSI(14, 70, 30);
const result = rsi.calculateLastWithCondition(candles);

if (result && result.condition === 'oversold') {
  // RSI indicates oversold
}
```

### MovingAverage

Calculate Simple and Exponential Moving Averages.

```typescript
class MovingAverage {
  calculateSMA(values: number[], period: number): number[];
  calculateEMA(values: number[], period: number): number[];
  calculateMultipleSMA(candles: Candle[], periods: number[]): Map<number, number[]>;
  calculateMultipleEMA(candles: Candle[], periods: number[]): Map<number, number[]>;
  getLastSMA(candles: Candle[], period: number): number | null;
  getLastEMA(candles: Candle[], period: number): number | null;
  determineTrend(shortMA: number, longMA: number, tolerance?: number): TrendDirection;
  isCrossover(
    current: { short: number; long: number },
    previous: { short: number; long: number }
  ): 'golden' | 'death' | null;
  isPriceAboveMA(price: number, ma: number): boolean;
  getMAStrength(price: number, mas: number[]): number;
  getMASeparation(shortMA: number, longMA: number): number;
}

type TrendDirection = 'bullish' | 'bearish' | 'neutral';
```

**Example Usage:**

```typescript
const ma = new MovingAverage();
const sma20 = ma.getLastSMA(candles, 20);
const sma50 = ma.getLastSMA(candles, 50);
const trend = ma.determineTrend(sma20!, sma50!);
```

### SignalGenerator

Generate trading signals based on combined indicators.

```typescript
class SignalGenerator {
  constructor(config?: SignalGeneratorConfig);

  generateSignal(candles: Candle[], currencyPair: string): Signal | null;
  updateConfig(config: Partial<SignalGeneratorConfig>): void;
}

interface SignalGeneratorConfig {
  rsiPeriod?: number;
  rsiOverbought?: number;
  rsiOversold?: number;
  bbPeriod?: number;
  bbStdDev?: number;
  smaPeriods?: [number, number];
  emaPeriods?: [number, number];
  minConfidenceLevel?: ConfidenceLevel;
}
```

**Example Usage:**

```typescript
const generator = new SignalGenerator({
  rsiPeriod: 14,
  rsiOverbought: 70,
  rsiOversold: 30,
  minConfidenceLevel: 'MEDIUM',
});

const signal = generator.generateSignal(candles, 'EURUSD');
if (signal) {
  console.log(`${signal.type} signal with ${signal.confidence} confidence`);
}
```

## Services

### ForexDataProvider

Interface for forex data sources.

```typescript
interface ForexDataProvider {
  getQuote(symbol: string): Promise<Quote>;
  getTimeSeries(symbol: string, timeframe: Timeframe, limit?: number): Promise<Candle[]>;
  getMultipleQuotes(symbols: string[]): Promise<Quote[]>;
}

interface Quote {
  symbol: string;
  bid: number;
  ask: number;
  timestamp: Date;
  spread?: number;
}
```

### AlphaVantageApi

Implementation of ForexDataProvider for Alpha Vantage.

```typescript
class AlphaVantageApi extends BaseForexApi {
  constructor(apiKey: string);

  async getQuote(symbol: string): Promise<Quote>;
  async getTimeSeries(symbol: string, timeframe: Timeframe, limit?: number): Promise<Candle[]>;
  async getMultipleQuotes(symbols: string[]): Promise<Quote[]>;
}
```

**Rate Limits:**
- 5 API requests per minute
- 500 requests per day (free tier)
- Automatic rate limiting handled internally

**Example Usage:**

```typescript
const api = new AlphaVantageApi('YOUR_API_KEY');
const candles = await api.getTimeSeries('EURUSD', '15min', 100);
```

### StorageService

Local data persistence using AsyncStorage.

```typescript
class StorageService {
  static async setItem<T>(key: string, value: T): Promise<void>;
  static async getItem<T>(key: string): Promise<T | null>;
  static async removeItem(key: string): Promise<void>;
  static async clear(): Promise<void>;
  static async getAllKeys(): Promise<string[]>;
}

const STORAGE_KEYS = {
  SETTINGS: 'settings',
  SIGNAL_HISTORY: 'signal_history',
  FAVORITE_PAIRS: 'favorite_pairs',
  THEME: 'theme',
  NOTIFICATIONS_ENABLED: 'notifications_enabled',
  // ...
} as const;
```

**Example Usage:**

```typescript
// Save settings
await StorageService.setItem(STORAGE_KEYS.SETTINGS, userSettings);

// Load settings
const settings = await StorageService.getItem<UserSettings>(STORAGE_KEYS.SETTINGS);
```

### NotificationService

Push notification management.

```typescript
class NotificationService {
  static getInstance(): NotificationService;

  async requestPermissions(): Promise<boolean>;
  async sendSignalNotification(signal: Signal): Promise<void>;
  async sendBulkSignalNotification(signals: Signal[]): Promise<void>;
  async cancelAllNotifications(): Promise<void>;
  async getBadgeCount(): Promise<number>;
  async setBadgeCount(count: number): Promise<void>;
  async clearBadge(): Promise<void>;
  setupNotificationListeners(
    onNotificationReceived?: (notification: Notification) => void,
    onNotificationResponse?: (response: NotificationResponse) => void
  ): () => void;
}
```

**Example Usage:**

```typescript
const notificationService = NotificationService.getInstance();

// Request permissions
const hasPermission = await notificationService.requestPermissions();

// Send notification
if (hasPermission) {
  await notificationService.sendSignalNotification(signal);
}

// Setup listeners
const cleanup = notificationService.setupNotificationListeners(
  (notification) => console.log('Received:', notification),
  (response) => console.log('User tapped:', response)
);

// Cleanup when component unmounts
cleanup();
```

### BackgroundTaskService

Background fetch for periodic signal checks.

```typescript
class BackgroundTaskService {
  static getInstance(): BackgroundTaskService;

  async registerBackgroundTask(intervalMinutes?: number): Promise<void>;
  async unregisterBackgroundTask(): Promise<void>;
  async getStatus(): Promise<BackgroundFetchStatus>;
  async isTaskRegistered(): Promise<boolean>;
}
```

## State Management

### Zustand Stores

#### useSignalsStore

```typescript
interface SignalsState {
  signals: Map<string, SignalData>;
  activeSignals: Signal[];
  isAnalyzing: boolean;

  setSignal: (currencyPair: string, signal: Signal | null, candles: Candle[]) => void;
  setLoading: (currencyPair: string, isLoading: boolean) => void;
  setError: (currencyPair: string, error: string | null) => void;
  clearSignal: (currencyPair: string) => void;
  clearAllSignals: () => void;
  getSignalData: (currencyPair: string) => SignalData | undefined;
  updateActiveSignals: () => void;
  setAnalyzing: (isAnalyzing: boolean) => void;
}
```

#### useSettingsStore

```typescript
interface SettingsState extends UserSettings {
  updateSettings: (settings: Partial<UserSettings>) => void;
  resetToDefaults: () => void;
  loadSettings: () => Promise<void>;
  saveSettings: () => Promise<void>;
}

interface UserSettings {
  notificationsEnabled: boolean;
  updateInterval: number;
  minConfidenceLevel: ConfidenceLevel;
  rsiPeriod: number;
  rsiOverbought: number;
  rsiOversold: number;
  bbPeriod: number;
  bbStdDev: number;
  smaPeriods: [number, number];
  emaPeriods: [number, number];
  defaultTimeframe: Timeframe;
  favoritePairs: string[];
  onboardingCompleted: boolean;
}
```

#### useHistoryStore

```typescript
interface HistoryState {
  history: SignalHistory[];
  isLoading: boolean;

  addSignalToHistory: (signalHistory: SignalHistory) => void;
  updateSignalOutcome: (
    signalId: string,
    outcome: 'profit' | 'loss' | 'neutral',
    pips?: number
  ) => void;
  removeFromHistory: (signalId: string) => void;
  clearHistory: () => void;
  loadHistory: () => Promise<void>;
  saveHistory: () => Promise<void>;
  getStatistics: () => Statistics;
}

interface Statistics {
  total: number;
  profitable: number;
  losses: number;
  winRate: number;
  totalPips: number;
}
```

#### useThemeStore

```typescript
interface ThemeState {
  mode: ThemeMode; // 'light' | 'dark'
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
  loadTheme: () => Promise<void>;
}
```

## Hooks

### useForexData

Data fetching hooks using React Query.

```typescript
// Get current quote
const { data: quote, isLoading, error } = useForexQuote('EURUSD');

// Get time series data
const { data: candles } = useForexTimeSeries('EURUSD', '15min', 100);

// Get multiple quotes
const { data: quotes } = useMultipleQuotes(['EURUSD', 'GBPUSD']);
```

### useSignals

Signal generation hooks.

```typescript
// Generate signal for single pair
const { isLoading, error } = useSignalGeneration('EURUSD', '15min');

// Generate signals for multiple pairs
const { isAnalyzing, results } = useBatchSignalGeneration(
  ['EURUSD', 'GBPUSD'],
  '15min'
);
```

### useNotifications

Notification management hook.

```typescript
const { requestPermissions, sendSignalNotification, activeSignals } = useNotifications();

// Request permissions
await requestPermissions();

// Send notification for signal
await sendSignalNotification(signal);
```

### useTheme

Theme management hook.

```typescript
const { theme, mode, toggleTheme, isDark } = useTheme();

// Toggle theme
toggleTheme();

// Access theme colors
const backgroundColor = theme.colors.background;
```

## External APIs

### Alpha Vantage API

**Base URL**: `https://www.alphavantage.co/query`

**Authentication**: API key in query parameter

#### Get Exchange Rate

```
GET /query?function=CURRENCY_EXCHANGE_RATE&from_currency=EUR&to_currency=USD&apikey=YOUR_API_KEY
```

**Response:**

```json
{
  "Realtime Currency Exchange Rate": {
    "1. From_Currency Code": "EUR",
    "2. From_Currency Name": "Euro",
    "3. To_Currency Code": "USD",
    "4. To_Currency Name": "United States Dollar",
    "5. Exchange Rate": "1.08542",
    "6. Last Refreshed": "2024-01-15 10:30:00",
    "7. Time Zone": "UTC",
    "8. Bid Price": "1.08540",
    "9. Ask Price": "1.08544"
  }
}
```

#### Get Intraday Time Series

```
GET /query?function=FX_INTRADAY&from_symbol=EUR&to_symbol=USD&interval=15min&apikey=YOUR_API_KEY
```

**Response:**

```json
{
  "Meta Data": {
    "1. Information": "Forex Intraday (15min) Time Series",
    "2. From Symbol": "EUR",
    "3. To Symbol": "USD",
    "4. Last Refreshed": "2024-01-15 10:30:00",
    "5. Interval": "15min",
    "6. Output Size": "Compact",
    "7. Time Zone": "UTC"
  },
  "Time Series FX (15min)": {
    "2024-01-15 10:30:00": {
      "1. open": "1.08520",
      "2. high": "1.08550",
      "3. low": "1.08510",
      "4. close": "1.08542"
    }
    // ... more candles
  }
}
```

### Rate Limiting

The app automatically handles rate limiting:

```typescript
// Implemented in BaseForexApi
private async checkRateLimit(): Promise<void> {
  // Wait if necessary to respect 5 requests/minute limit
}
```

### Error Handling

All API calls return standardized errors:

```typescript
interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

try {
  const candles = await api.getTimeSeries('EURUSD', '15min');
} catch (error: ApiError) {
  console.error(`${error.code}: ${error.message}`);
}
```

## Utility Functions

### Formatting

```typescript
// Price formatting
formatPrice(1.08542, 5); // "1.08542"

// Pip formatting
formatPips(25.5); // "+25.5 pips"

// Percentage formatting
formatPercentage(66.67); // "66.67%"

// Date/time formatting
formatDateTime(new Date()); // "Jan 15, 2024 10:30"
formatRelativeTime(new Date()); // "2 hours ago"
```

### Calculations

```typescript
// Calculate pips
const pips = calculatePriceChange(1.08542, 1.08442);
// { change: 0.001, changePercent: 0.092 }

// Risk-reward ratio
const rrRatio = calculateRiskReward(1.0850, 1.0830, 1.0890);
// 2.0 (1:2 risk-reward)

// Position sizing
const size = calculatePositionSize(10000, 1, 20, 10);
// Lots to risk 1% on 20-pip stop
```

### Validation

```typescript
// Validate user inputs
isValidRSIPeriod(14); // true
isValidRSIPeriod(100); // false

isValidRSILevel(70); // true
isValidRSILevel(150); // false

const errors = validateSettings(userSettings);
if (errors.length > 0) {
  console.error('Invalid settings:', errors);
}
```

## Constants

```typescript
// API Configuration
export const API_CONFIG = {
  ALPHA_VANTAGE: {
    BASE_URL: 'https://www.alphavantage.co/query',
    API_KEY: process.env.ALPHA_VANTAGE_API_KEY || 'demo',
    RATE_LIMIT: 5,
  },
  DEFAULT_UPDATE_INTERVAL: 15,
  CACHE_DURATION: 5 * 60 * 1000,
};

// App Configuration
export const APP_CONFIG = {
  DEFAULT_TIMEFRAME: '15min',
  DEFAULT_RSI_PERIOD: 14,
  DEFAULT_RSI_OVERBOUGHT: 70,
  DEFAULT_RSI_OVERSOLD: 30,
  DEFAULT_BB_PERIOD: 20,
  DEFAULT_BB_STD_DEV: 2,
  MAX_SIGNAL_HISTORY: 100,
  SIGNAL_EXPIRY_HOURS: 24,
};

// Currency Pairs
export const MAJOR_PAIRS: CurrencyPair[];
export const CROSS_PAIRS: CurrencyPair[];
export const ALL_PAIRS: CurrencyPair[];
```

---

**Note**: This API is internal to TradeSense and subject to change. For integration questions, please open an issue on GitHub.
