export const LEGAL_DISCLAIMER = `
IMPORTANT DISCLAIMER:

TradeSense is an educational tool designed to help users learn about technical analysis and trading strategies.

⚠️ Please Read Carefully:

1. NOT FINANCIAL ADVICE: The signals and information provided by this application are for educational purposes only and do not constitute financial, investment, or trading advice.

2. NO GUARANTEES: Past performance and technical indicators do not guarantee future results. Trading forex involves substantial risk of loss.

3. USE AT YOUR OWN RISK: All trading decisions should be made by you and you alone. We are not responsible for any financial losses incurred.

4. EDUCATIONAL PURPOSE: This app is designed to help you understand technical analysis concepts, not to provide trading recommendations.

5. CONSULT PROFESSIONALS: Always consult with a qualified financial advisor before making any investment decisions.

By using this application, you acknowledge that you understand and accept these terms.
`;

export const INDICATOR_EXPLANATIONS = {
  RSI: {
    title: 'Relative Strength Index (RSI)',
    description:
      'RSI measures the magnitude of recent price changes to evaluate overbought or oversold conditions.',
    interpretation: `
• RSI > 70: Potentially overbought (may indicate sell opportunity)
• RSI < 30: Potentially oversold (may indicate buy opportunity)
• RSI 40-60: Neutral zone
• Period: Typically 14 candles
    `,
    formula: 'RSI = 100 - (100 / (1 + RS))\nwhere RS = Average Gain / Average Loss',
  },
  BOLLINGER_BANDS: {
    title: 'Bollinger Bands',
    description:
      'Bollinger Bands consist of a middle band (SMA) and two outer bands that are standard deviations away.',
    interpretation: `
• Price touching lower band: Potentially oversold
• Price touching upper band: Potentially overbought
• Bandwidth expansion: Increased volatility
• Bandwidth contraction: Decreased volatility
• Period: Typically 20, with 2 standard deviations
    `,
    formula: 'Upper Band = SMA(20) + 2σ\nMiddle Band = SMA(20)\nLower Band = SMA(20) - 2σ',
  },
  MOVING_AVERAGES: {
    title: 'Moving Averages (SMA & EMA)',
    description:
      'Moving averages smooth price data to identify trends. SMA weights all periods equally, while EMA gives more weight to recent prices.',
    interpretation: `
• Price above MA: Bullish trend
• Price below MA: Bearish trend
• Short MA crosses above Long MA: Golden Cross (bullish)
• Short MA crosses below Long MA: Death Cross (bearish)
• Common periods: 20, 50, 200
    `,
    formula: 'SMA = (P1 + P2 + ... + Pn) / n\nEMA = (Price × k) + (Previous EMA × (1-k))\nwhere k = 2/(n+1)',
  },
};

export const TRADING_EDUCATION = [
  {
    id: '1',
    title: 'Understanding Forex Trading',
    content: `Forex (Foreign Exchange) is the global marketplace for trading currencies. It's the largest financial market in the world with over $6 trillion traded daily.

Key Concepts:
• Currency Pairs: Always traded in pairs (e.g., EUR/USD)
• Pips: The smallest price movement (usually 0.0001)
• Leverage: Trading with borrowed money (high risk!)
• Spread: Difference between buy and sell price`,
  },
  {
    id: '2',
    title: 'Technical Analysis Basics',
    content: `Technical analysis studies historical price movements to predict future trends.

Core Principles:
• Price moves in trends
• History tends to repeat itself
• Market psychology is reflected in price
• Multiple timeframes provide different perspectives

This app uses three main indicators that work together to identify potential entry points.`,
  },
  {
    id: '3',
    title: 'Risk Management',
    content: `Proper risk management is crucial for successful trading.

Essential Rules:
• Never risk more than 1-2% per trade
• Always use stop-loss orders
• Don't trade with money you can't afford to lose
• Avoid emotional decision-making
• Keep a trading journal

Remember: Protecting your capital is more important than making profits.`,
  },
  {
    id: '4',
    title: 'How TradeSense Generates Signals',
    content: `Our signal generation combines multiple indicators:

BUY Signal Generated When:
✓ Price touches lower Bollinger Band
✓ RSI is oversold (<30)
✓ Moving averages confirm bullish trend

SELL Signal Generated When:
✓ Price touches upper Bollinger Band
✓ RSI is overbought (>70)
✓ Moving averages confirm bearish trend

Confidence Level depends on how many conditions are met and their strength.`,
  },
];
