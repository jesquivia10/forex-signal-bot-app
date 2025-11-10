# TradeSense - User Manual

Welcome to TradeSense! This comprehensive guide will help you understand and use all features of the app.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Understanding the Interface](#understanding-the-interface)
3. [Reading Signals](#reading-signals)
4. [Configuring Settings](#configuring-settings)
5. [Learning Center](#learning-center)
6. [Signal History](#signal-history)
7. [Notifications](#notifications)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)

## Getting Started

### First Launch

When you first open TradeSense, you'll see an important **disclaimer**:

> ⚠️ **This app is for educational purposes only and does not constitute financial advice.**

Please read this carefully and tap **"I Understand and Accept"** to continue.

### Home Screen Overview

After accepting the disclaimer, you'll arrive at the **Signals** screen, which shows:
- Active trading signals for monitored currency pairs
- Confidence levels (HIGH, MEDIUM, LOW)
- Signal type (BUY or SELL)
- Time since signal was generated

### Initial Setup

1. **Grant Notification Permissions** (recommended)
   - Allows the app to alert you about new signals
   - You can configure this in Settings

2. **Review Monitored Pairs**
   - By default, the app monitors 4 major currency pairs
   - You can customize this in Settings

## Understanding the Interface

### Navigation Bar

TradeSense has four main sections accessible via the bottom navigation bar:

#### 📊 Signals (Home)
- View all active trading signals
- Pull to refresh for latest data
- Tap any signal to view detailed analysis

#### 📚 Learn
- Educational content about trading
- Technical indicator explanations
- Trading fundamentals
- Strategy guides

#### 📖 History
- Past signals you've tracked
- Performance statistics
- Win rate and pip totals
- Individual signal outcomes

#### ⚙️ Settings
- Customize indicator parameters
- Configure notifications
- Adjust update frequency
- Change theme (Dark/Light mode)

## Reading Signals

### Signal Card Anatomy

Each signal card displays:

```
┌─────────────────────────────────┐
│ 🔵 EUR/USD          [MEDIUM]   │  ← Pair & Confidence
│ 2 hours ago                     │  ← Time
│                                 │
│ Signal: BUY                     │  ← Type
│ Price: 1.08542                  │  ← Entry price
│ RSI: 28.5                       │  ← Current RSI
│                                 │
│ [Reasoning text box]            │  ← Why this signal
└─────────────────────────────────┘
```

### Confidence Levels Explained

**🟢 HIGH Confidence**
- Multiple indicators strongly aligned
- RSI deeply oversold/overbought
- Price clearly at Bollinger Band extremes
- Trend confirmation from MAs
- **Score**: 7+ points

**🟡 MEDIUM Confidence**
- Most indicators aligned
- Moderate RSI conditions
- Price near Bollinger Bands
- Some trend confirmation
- **Score**: 4-6 points

**🔴 LOW Confidence**
- Few indicators aligned
- Weak RSI signal
- Price not at extremes
- Mixed trend signals
- **Score**: 1-3 points

### Signal Types

**BUY Signal 📈**
- Suggests potential upward price movement
- Look for:
  - Price at/below lower Bollinger Band
  - RSI < 30 (oversold)
  - Bullish MA crossover

**SELL Signal 📉**
- Suggests potential downward price movement
- Look for:
  - Price at/above upper Bollinger Band
  - RSI > 70 (overbought)
  - Bearish MA crossover

### Detailed Signal View

Tap any signal to see:
- **Full indicator readings**: RSI, all Bollinger Bands, MAs
- **Entry price**: Suggested entry point
- **Detailed reasoning**: Why each indicator contributed
- **Timestamp**: When the signal was generated
- **Trend analysis**: Current market direction

## Configuring Settings

### Appearance

**Dark/Light Mode**
- Toggle between dark and light themes
- Changes apply immediately
- Persisted across app restarts

### Notifications

**Enable/Disable Push Notifications**
- Turn on to receive alerts for new signals
- High-confidence signals are prioritized
- Multiple signals are grouped

**Update Interval**
- Default: 15 minutes
- Range: 5-60 minutes
- Shorter intervals = more battery usage
- API limits apply (5 requests/minute max)

### Indicator Settings

**RSI (Relative Strength Index)**
- **Period**: Number of candles (default: 14)
  - Lower = more sensitive, more signals
  - Higher = less sensitive, fewer signals
- **Overbought Level**: Default 70
  - Increase for stricter SELL signals
- **Oversold Level**: Default 30
  - Decrease for stricter BUY signals

**Bollinger Bands**
- **Period**: SMA period (default: 20)
- **Standard Deviations**: Default 2
  - Increase for wider bands
  - Decrease for narrower bands

**Moving Averages**
- **SMA/EMA Periods**: Default 20, 50
- These determine trend direction
- Cannot be customized in current version

### Monitored Currency Pairs

The app tracks these pairs by default:
- EUR/USD (Euro/US Dollar)
- GBP/USD (British Pound/US Dollar)
- USD/JPY (US Dollar/Japanese Yen)
- USD/CHF (US Dollar/Swiss Franc)

*Note: Pair selection will be customizable in a future update*

## Learning Center

### Trading Fundamentals

The **Learn** tab includes comprehensive educational content:

1. **Understanding Forex Trading**
   - What is forex?
   - Currency pairs explained
   - Pips and spreads
   - Leverage and margin

2. **Technical Analysis Basics**
   - Core principles
   - Chart reading
   - Timeframes
   - Market psychology

3. **Risk Management**
   - Position sizing
   - Stop-loss orders
   - Risk-reward ratios
   - Trading psychology

4. **How TradeSense Works**
   - Signal generation process
   - Indicator combinations
   - Confidence calculation
   - Best use cases

### Indicator Deep Dives

Each indicator has an expandable card with:
- **What it is**: Basic definition
- **How to interpret**: Reading the indicator
- **Formula**: Mathematical calculation
- **Best practices**: When to use it

**Available Indicators:**
- RSI (Relative Strength Index)
- Bollinger Bands
- Moving Averages (SMA & EMA)

## Signal History

### Tracking Signals

Currently, signal history is automatically maintained. Features:
- View all past signals
- See when they were generated
- Check their confidence levels
- Review reasoning

### Performance Statistics

The history screen shows:
- **Total Signals**: How many signals generated
- **Profitable**: Hypothetical winning trades
- **Losses**: Hypothetical losing trades
- **Win Rate**: Success percentage
- **Total Pips**: Cumulative pip movement

*Note: These are educational metrics only, not real trading results*

### Future Features

Coming soon:
- Manual outcome tracking
- Personal notes on signals
- Screenshot capture
- Export to CSV

## Notifications

### Setting Up Notifications

1. Grant permission when prompted
2. Enable in Settings > Notifications
3. Choose update interval
4. App will alert you automatically

### Notification Types

**Single Signal Alert**
```
🔔 BUY Signal - EUR/USD
HIGH confidence at 1.08542
RSI oversold, price at lower BB
```

**Multiple Signals Alert**
```
🔔 3 New Trading Signals
Including 1 high confidence signal
Check the app for details
```

### Background Updates

- **iOS**: Minimum 15-minute intervals
- **Android**: More flexible scheduling
- **Battery**: Optimized for low consumption
- **Requirement**: App must be backgrounded, not killed

## Best Practices

### For Beginners

1. **Start with HIGH confidence signals only**
   - Filter out MEDIUM and LOW in settings
   - Focus on quality over quantity

2. **Don't trade real money immediately**
   - Use demo accounts first
   - Paper trade to practice
   - Learn from mistakes safely

3. **Study each signal**
   - Tap to view details
   - Understand WHY it was generated
   - Compare with actual market movement

4. **Learn the indicators**
   - Read the education section
   - Understand RSI, BB, MA individually
   - See how they work together

### For Intermediate Traders

1. **Customize indicator settings**
   - Adjust RSI levels for your style
   - Modify BB periods for volatility
   - Experiment with different combinations

2. **Track performance mentally**
   - Note which signals would profit
   - Identify patterns in failures
   - Adjust confidence threshold

3. **Use multiple timeframes**
   - Cross-reference with longer charts
   - Confirm signals with 4H/Daily
   - Avoid counter-trend trades

4. **Combine with other analysis**
   - Add fundamental analysis
   - Check economic calendar
   - Consider market sentiment

### General Tips

✅ **DO:**
- Use signals as learning tools
- Verify with other sources
- Practice risk management
- Keep a trading journal
- Stay patient and disciplined

❌ **DON'T:**
- Trade every signal blindly
- Risk more than 1-2% per trade
- Ignore stop-losses
- Trade emotionally
- Expect 100% accuracy

## Troubleshooting

### No Signals Appearing

**Possible causes:**
- No active signals for monitored pairs
- API rate limit reached
- Network connection issues
- Indicator criteria not met

**Solutions:**
- Wait for market conditions to align
- Check internet connection
- Try manual refresh (pull down)
- Lower confidence threshold in settings

### Notifications Not Working

**Check:**
- Permissions granted (Settings > Notifications)
- Notifications enabled in app settings
- Phone's Do Not Disturb mode
- App not force-closed

**Fix:**
- Re-enable permissions in phone settings
- Toggle notifications off/on in app
- Restart the app

### Charts Not Loading

**Issues:**
- API key invalid/missing
- Rate limit exceeded
- Network problems
- Insufficient historical data

**Fix:**
- Verify API key in .env file
- Wait 1 minute if rate limited
- Check internet connection
- Try different currency pair

### App Performance

**If app is slow:**
- Reduce update interval
- Close and reopen app
- Clear app cache (phone settings)
- Update to latest version

### Data Accuracy

**Important notes:**
- Data delayed by API provider
- Free tier has limitations
- Prices may differ from broker
- Use for education, not live trading

## Frequently Asked Questions

**Q: Can I use this for real trading?**
A: TradeSense is educational only. While signals use proven technical analysis, they're meant for learning, not financial advice.

**Q: How accurate are the signals?**
A: Technical analysis is probabilistic, not predictive. No indicator guarantees profits. Always manage risk.

**Q: Can I add more currency pairs?**
A: Current version monitors preset pairs. Custom pair selection coming in future update.

**Q: Does it work with crypto or stocks?**
A: Currently forex only. Other markets may be added later.

**Q: How much does it cost?**
A: The app is free. You need a free Alpha Vantage API key (also free).

**Q: Can I backtest strategies?**
A: Basic backtesting planned for future version. Current version is real-time only.

**Q: Is my data private?**
A: Yes. All data stored locally on your device. No personal info collected.

**Q: What if I disagree with a signal?**
A: Signals are suggestions, not commands. Use your own analysis and judgment always.

## Getting Help

**Resources:**
- 📖 This manual
- 🏗️ [Technical Architecture](architecture.md)
- 🔧 [API Documentation](API_DOCS.md)
- 🐛 [Report Issues on GitHub](https://github.com/yourusername/tradesense/issues)

**Community:**
- Join discussions on GitHub
- Share feedback and suggestions
- Contribute to development

---

**Remember**: Trading carries risk. This app is for educational purposes only. Never trade with money you can't afford to lose. Always consult a licensed financial advisor. 

Happy learning! 📚✨
