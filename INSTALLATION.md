# TradeSense - Installation Guide

## Quick Start (5 minutes)

### Step 1: Prerequisites

Make sure you have installed:

```bash
# Node.js 16 or higher
node --version  # Should show v16.x.x or higher

# npm (comes with Node.js)
npm --version

# Expo CLI (install globally)
npm install -g expo-cli
```

### Step 2: Clone or Download

If you haven't already:

```bash
cd /workspace
# Project files should already be here
```

### Step 3: Install Dependencies

```bash
npm install
```

This will install all required packages (~2-3 minutes).

### Step 4: Configure API Key

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Get a free API key from Alpha Vantage:
   - Visit: https://www.alphavantage.co/support/#api-key
   - Fill the form (takes 30 seconds)
   - You'll receive the key via email instantly

3. Edit `.env` file:
```bash
nano .env  # or use any text editor
```

4. Replace `demo` with your actual API key:
```
ALPHA_VANTAGE_API_KEY=YOUR_ACTUAL_KEY_HERE
```

### Step 5: Start the App

```bash
npm start
```

This opens the Expo Developer Tools in your browser.

### Step 6: Run on Device/Simulator

**Option A: iOS Simulator (Mac only)**
```bash
npm run ios
```

**Option B: Android Emulator**
```bash
npm run android
```

**Option C: Physical Device**
1. Install "Expo Go" app on your phone
   - iOS: https://apps.apple.com/app/expo-go/id982107779
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent

2. Scan the QR code shown in your terminal/browser

## Detailed Setup

### System Requirements

**macOS:**
- macOS 10.15 or later (for iOS development)
- Xcode 12+ (for iOS simulator)
- 8GB RAM minimum, 16GB recommended

**Windows:**
- Windows 10 or later
- Android Studio (for Android emulator)
- 8GB RAM minimum, 16GB recommended

**Linux:**
- Ubuntu 20.04 or equivalent
- Android Studio (for Android emulator)
- 8GB RAM minimum

### Installing Xcode (macOS only)

For iOS development:

```bash
# Install from App Store (it's free but large, ~12GB)
# Or install Command Line Tools only:
xcode-select --install
```

### Installing Android Studio

1. Download from: https://developer.android.com/studio
2. Install and open Android Studio
3. Go to: Tools → AVD Manager
4. Create a new Virtual Device (recommended: Pixel 5, API 33)

### Troubleshooting Installation

**Error: `expo-cli` not found**
```bash
# Install globally
npm install -g expo-cli

# Or use npx
npx expo start
```

**Error: Port 19000 already in use**
```bash
# Kill the process
lsof -ti:19000 | xargs kill -9

# Or use a different port
expo start --port 19001
```

**Error: Unable to resolve module**
```bash
# Clear cache and reinstall
rm -rf node_modules
npm cache clean --force
npm install
```

**Error: Metro bundler issues**
```bash
# Reset Metro cache
expo start -c
```

## Development Workflow

### Daily Development

```bash
# Start the dev server
npm start

# Run tests
npm test

# Check types
npm run type-check

# Lint code
npm run lint

# Format code
npm run format
```

### Making Changes

1. Edit code in `src/` or `app/` directories
2. Save the file
3. Expo will automatically reload the app
4. If it doesn't, press `r` in the terminal

### Hot Reload

- **Fast Refresh**: Automatically enabled
- Press `r`: Reload the app
- Press `m`: Toggle menu
- Press `d`: Open dev tools
- Press `i`: Run on iOS simulator
- press `a`: Run on Android emulator

## Building for Production

### Prerequisites for Building

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure your project
eas build:configure
```

### Create Development Build

```bash
# iOS Development Build
eas build --profile development --platform ios

# Android Development Build
eas build --profile development --platform android
```

### Create Production Build

```bash
# iOS Production Build (for App Store)
eas build --profile production --platform ios

# Android Production Build (for Play Store)
eas build --profile production --platform android
```

### Submit to Stores

```bash
# Submit to App Store
eas submit --platform ios

# Submit to Google Play
eas submit --platform android
```

## Project Structure Overview

```
/workspace/
├── app/                  # Navigation & Screens (Expo Router)
├── src/
│   ├── core/            # Business Logic
│   ├── services/        # External Services
│   ├── store/           # State Management
│   ├── hooks/           # Custom Hooks
│   ├── components/      # UI Components
│   ├── utils/           # Helper Functions
│   ├── config/          # Configuration
│   └── types/           # TypeScript Types
├── assets/              # Images & Icons
└── docs/                # Documentation
```

## Environment Variables

Create `.env` file with:

```bash
# Required
ALPHA_VANTAGE_API_KEY=your_key_here

# Optional
APP_ENV=development
API_BASE_URL=https://www.alphavantage.co/query
ENABLE_NOTIFICATIONS=true
ENABLE_BACKGROUND_FETCH=true
DEFAULT_UPDATE_INTERVAL=15
```

## Testing

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- SignalGenerator.test.ts
```

### Manual Testing

1. **Test Signal Generation**:
   - Open app
   - Wait for signals to load
   - Verify signals appear
   - Check confidence levels

2. **Test Notifications**:
   - Grant notification permissions
   - Wait for new signals
   - Verify notifications arrive

3. **Test Settings**:
   - Change RSI period
   - Toggle dark mode
   - Adjust update interval
   - Verify changes persist

4. **Test History**:
   - View signal history
   - Check statistics
   - Verify win rate calculation

## Common Issues

### Issue: No Signals Appearing

**Cause**: API key not configured or invalid

**Solution**:
```bash
# Check .env file exists
cat .env

# Verify API key is set correctly
# Should NOT be "demo" for production
```

### Issue: App Crashes on Startup

**Cause**: Dependency version mismatch

**Solution**:
```bash
# Delete and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Slow Performance

**Cause**: Development mode or too many logs

**Solution**:
```bash
# Build production version for better performance
eas build --profile production
```

### Issue: Charts Not Rendering

**Cause**: Missing chart data or SVG issues

**Solution**:
- Ensure currency pair has data
- Check console for errors
- Try different currency pair

## Getting Help

- 📖 [User Manual](docs/USER_MANUAL.md)
- 🏗️ [Architecture Docs](docs/architecture.md)
- 🔧 [API Documentation](docs/API_DOCS.md)
- 🐛 [Report Issues](https://github.com/yourusername/tradesense/issues)

## Next Steps

After successful installation:

1. ✅ Read the [User Manual](docs/USER_MANUAL.md)
2. ✅ Explore the Education tab
3. ✅ Customize settings
4. ✅ Monitor signals
5. ✅ Review documentation

## Updating the App

```bash
# Pull latest changes
git pull origin main

# Install new dependencies
npm install

# Clear cache if needed
expo start -c
```

## Uninstalling

```bash
# Remove node modules
rm -rf node_modules

# Remove build artifacts
rm -rf .expo

# Uninstall Expo CLI
npm uninstall -g expo-cli

# Delete project folder
cd ..
rm -rf tradesense
```

---

**Need help?** Open an issue or check the documentation!

Happy trading (for educational purposes)! 📚✨
