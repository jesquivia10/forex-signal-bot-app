# TradeSense - Forex Trading Signals App

> 🎯 **Educational Trading Signal Generator for Forex Markets**

TradeSense is a mobile application that generates trading signals based on technical analysis indicators (RSI, Bollinger Bands, and Moving Averages). Designed for educational purposes to help traders learn technical analysis.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![React Native](https://img.shields.io/badge/React%20Native-0.72-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-49-black.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)

## 📱 Features

### Core Functionality
- ✅ **Real-time Signal Generation**: Automated analysis every 15 minutes
- 📊 **Technical Indicators**: RSI, Bollinger Bands, SMA/EMA
- 🎯 **Confidence Levels**: HIGH, MEDIUM, LOW signal ratings
- 📈 **Interactive Charts**: Visualize price action and indicators
- 🔔 **Push Notifications**: Get alerted for high-confidence signals
- 🌓 **Dark/Light Mode**: Beautiful UI in both themes
- 📚 **Educational Content**: Learn about indicators and trading
- 📖 **Signal History**: Track past signals and performance

### Supported Currency Pairs
- **Major Pairs**: EUR/USD, GBP/USD, USD/JPY, USD/CHF, AUD/USD, USD/CAD, NZD/USD
- **Cross Pairs**: EUR/GBP, EUR/JPY, GBP/JPY

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (Mac) or Android Emulator
- Alpha Vantage API Key ([Get free key](https://www.alphavantage.co/support/#api-key))

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/tradesense.git
cd tradesense

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Add your API key to .env
# ALPHA_VANTAGE_API_KEY=your_api_key_here

# Start the development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android
```

## 📐 Architecture

TradeSense follows Clean Architecture principles with a feature-based folder structure:

```
├── app/                    # Expo Router navigation
├── src/
│   ├── core/              # Domain layer (entities, indicators)
│   ├── services/          # Infrastructure (API, storage, notifications)
│   ├── store/             # State management (Zustand)
│   ├── hooks/             # Custom React hooks
│   ├── components/        # UI components
│   ├── utils/             # Helper functions
│   ├── config/            # Configuration files
│   └── types/             # TypeScript types
└── docs/                  # Documentation
```

### Tech Stack
- **Framework**: React Native + Expo
- **Language**: TypeScript
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Storage**: AsyncStorage
- **Charts**: React Native Chart Kit
- **Notifications**: Expo Notifications
- **API**: Alpha Vantage (Forex data)

## 🎓 How It Works

### Signal Generation Algorithm

TradeSense combines three technical indicators to generate trading signals:

#### 1. **RSI (Relative Strength Index)**
- Period: 14 (default, configurable)
- Oversold: < 30
- Overbought: > 70

#### 2. **Bollinger Bands**
- Period: 20 (default, configurable)
- Standard Deviations: 2

#### 3. **Moving Averages**
- SMA: 20, 50 periods
- EMA: 20, 50 periods
- Trend determination via crossovers

### Signal Conditions

**BUY Signal** generated when:
- Price touches/breaks below lower Bollinger Band
- RSI is oversold (< 30)
- Moving averages confirm bullish trend (bonus points)

**SELL Signal** generated when:
- Price touches/breaks above upper Bollinger Band
- RSI is overbought (> 70)
- Moving averages confirm bearish trend (bonus points)

**Confidence Level** is calculated based on:
- Number of conditions met (6+ = HIGH, 4-5 = MEDIUM, <4 = LOW)
- Strength of indicator readings
- Trend alignment

## ⚙️ Configuration

### Customizable Settings

Users can configure the following parameters:

- **RSI Settings**: Period, Overbought/Oversold levels
- **Bollinger Bands**: Period, Standard Deviations
- **Moving Averages**: Periods for SMA/EMA
- **Update Interval**: Signal refresh frequency (5-60 minutes)
- **Minimum Confidence**: Filter by confidence level
- **Monitored Pairs**: Select currency pairs to track

## 📊 API Integration

TradeSense uses Alpha Vantage API for forex data:

```typescript
// Free tier limits:
// - 5 API requests per minute
// - 500 requests per day

// The app implements:
// - Automatic rate limiting
// - Request caching (5 minutes)
// - Exponential backoff on errors
```

### Alternative Data Sources

You can easily swap data providers by implementing the `ForexDataProvider` interface:

```typescript
interface ForexDataProvider {
  getQuote(symbol: string): Promise<Quote>;
  getTimeSeries(symbol: string, timeframe: Timeframe, limit?: number): Promise<Candle[]>;
  getMultipleQuotes(symbols: string[]): Promise<Quote[]>;
}
```

## 🔔 Notifications

Background fetch runs periodically to check for new signals:

```typescript
// iOS: Minimum interval 15 minutes
// Android: More flexible intervals
// Both: Requires app to be in background, not terminated
```

**Setup**:
1. Grant notification permissions on first launch
2. Configure update interval in Settings
3. App will send push notifications for new signals

## 📱 Building for Production

### iOS

```bash
# Build for iOS
eas build --platform ios

# Submit to App Store
eas submit --platform ios
```

### Android

```bash
# Build for Android
eas build --platform android

# Submit to Google Play
eas submit --platform android
```

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

## ⚠️ Disclaimer

**IMPORTANT**: TradeSense is an **educational tool** only. 

- ❌ NOT financial advice
- ❌ NO guarantees of profit
- ❌ NO liability for losses
- ✅ FOR learning technical analysis
- ✅ FOR educational purposes only

**Always consult a licensed financial advisor before trading real money.**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests.

### Development Setup

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Submit a pull request

## 📞 Support

- 📖 [User Manual](docs/USER_MANUAL.md)
- 🏗️ [Architecture Documentation](docs/architecture.md)
- 🔧 [API Documentation](docs/API_DOCS.md)
- 🐛 [Report Issues](https://github.com/yourusername/tradesense/issues)

## 🗺️ Roadmap

### Version 1.1
- [ ] More currency pairs (crypto, commodities)
- [ ] Advanced backtesting
- [ ] Signal performance analytics
- [ ] Custom alert conditions

### Version 1.2
- [ ] Machine learning signal enhancement
- [ ] Social features (share signals)
- [ ] Multi-timeframe analysis
- [ ] Integration with demo trading accounts

## 👨‍💻 Author

Created with ❤️ by AI Development Agent

## 🙏 Acknowledgments

- Alpha Vantage for free forex data API
- React Native community
- Expo team
- All open-source contributors

---

**Remember**: This app is for education only. Never trade with money you can't afford to lose! 📚💡
