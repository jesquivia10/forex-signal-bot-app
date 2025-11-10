# TradeSense Assets

This directory contains all static assets for the app.

## Images Required

You need to create the following images:

### App Icons

- **icon.png** (1024x1024)
  - Main app icon
  - Should be a square icon
  - Suggested: Trading chart or signal symbol with TradeSense branding

- **adaptive-icon.png** (1024x1024)
  - Android adaptive icon
  - Center circle area should contain the main icon (512x512)
  - Outer area can be used for background

- **favicon.png** (48x48 or 64x64)
  - Web favicon
  - Simplified version of main icon

### Splash Screen

- **splash.png** (1284x2778 or larger)
  - Loading screen shown on app start
  - Background: #0F1419 (dark theme color)
  - Center: TradeSense logo/icon
  - Should work in portrait orientation

### Notification Icon

- **notification-icon.png** (96x96, white transparent)
  - Android notification icon
  - Should be simple, monochrome
  - White icon on transparent background

## Design Guidelines

### Color Scheme

**Dark Theme (Primary)**
- Primary: #00D4AA (Teal)
- Secondary: #6366F1 (Indigo)
- Background: #0F1419 (Almost black)
- Success: #10B981 (Green)
- Error: #EF4444 (Red)

**Light Theme**
- Primary: #00A88E
- Secondary: #4F46E5
- Background: #FFFFFF

### Icon Style

- Modern, minimal design
- Avoid too much detail
- Should be recognizable at small sizes
- Consider using:
  - Candlestick chart
  - Trend arrow
  - Signal wave
  - Currency symbols

## Creating Icons

### Using Design Tools

**Figma/Sketch:**
1. Create artboard with correct dimensions
2. Design icon following guidelines
3. Export as PNG with 3x resolution

**Online Tools:**
- [Icon Kitchen](https://icon.kitchen/)
- [MakeAppIcon](https://makeappicon.com/)
- [App Icon Generator](https://appicon.co/)

### From Command Line

```bash
# Install ImageMagick
brew install imagemagick  # Mac
apt-get install imagemagick  # Linux

# Create simple icon from text
convert -size 1024x1024 xc:"#0F1419" \
  -font Arial-Bold -pointsize 400 \
  -fill "#00D4AA" -gravity center \
  -annotate +0+0 "TS" \
  icon.png
```

## After Creating Icons

1. Replace placeholder files in this directory
2. Test app appearance:
   ```bash
   npm start
   ```
3. Build for testing:
   ```bash
   eas build --platform ios --profile development
   eas build --platform android --profile development
   ```

## Current Status

⚠️ **Placeholder files** are currently in place. Replace them with actual designs before production deployment.
