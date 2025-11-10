class AppConstants {
  // API Configuration
  static const String defaultForexApi = 'https://api.twelvedata.com';
  static const String alphaVantageApi = 'https://www.alphavantage.co/query';
  
  // Default Currency Pairs
  static const List<String> defaultPairs = [
    'EUR/USD',
    'GBP/USD',
    'USD/JPY',
    'USD/CHF',
    'AUD/USD',
    'USD/CAD',
    'NZD/USD',
    'EUR/GBP',
  ];
  
  // Indicator Defaults
  static const int defaultBollingerPeriods = 20;
  static const double defaultBollingerStdDev = 2.0;
  static const int defaultRSIPeriods = 14;
  static const double defaultRSIOversold = 30.0;
  static const double defaultRSIOverbought = 70.0;
  static const int defaultSMA20Periods = 20;
  static const int defaultSMA50Periods = 50;
  static const int defaultEMA20Periods = 20;
  static const int defaultEMA50Periods = 50;
  
  // Update Intervals (in minutes)
  static const List<int> updateIntervals = [15, 30, 60];
  static const int defaultUpdateInterval = 15;
  
  // Confidence Levels
  static const String confidenceHigh = 'high';
  static const String confidenceMedium = 'medium';
  static const String confidenceLow = 'low';
  
  // Signal Types
  static const String signalBuy = 'buy';
  static const String signalSell = 'sell';
  
  // Database
  static const String databaseName = 'tradesense.db';
  static const int databaseVersion = 1;
  
  // Shared Preferences Keys
  static const String keyThemeMode = 'theme_mode';
  static const String keyUpdateInterval = 'update_interval';
  static const String keyRSIPeriods = 'rsi_periods';
  static const String keyRSIOversold = 'rsi_oversold';
  static const String keyRSIOverbought = 'rsi_overbought';
  static const String keyBollingerPeriods = 'bollinger_periods';
  static const String keyBollingerStdDev = 'bollinger_std_dev';
  static const String keySelectedPairs = 'selected_pairs';
  static const String keyNotificationEnabled = 'notification_enabled';
  static const String keyNotificationConfidence = 'notification_confidence';
  static const String keyDisclaimerAccepted = 'disclaimer_accepted';
  
  // Legal Disclaimer
  static const String legalDisclaimer = '''
DISCLAIMER LEGAL

Esta aplicación proporciona señales de trading basadas en análisis técnico únicamente con fines educativos. Las señales generadas son sugerencias y NO constituyen asesoramiento financiero profesional.

IMPORTANTE:
- Las señales son solo sugerencias educativas
- No garantizamos ganancias ni resultados específicos
- El trading de divisas conlleva riesgo de pérdida de capital
- Siempre realice su propia investigación antes de tomar decisiones de trading
- Considere consultar con un asesor financiero profesional

El usuario es responsable de todas las decisiones de trading que tome.
''';
}
