# TradeSense - Arquitectura Técnica

## 📋 Resumen Ejecutivo

**TradeSense** es una aplicación móvil multiplataforma de análisis técnico y generación de señales para el mercado Forex. Utiliza React Native con Expo para compatibilidad iOS/Android y sigue una arquitectura limpia y modular.

## 🛠 Stack Tecnológico

### Framework Principal
- **React Native 0.72+** con **Expo SDK 49+**: Desarrollo multiplataforma
- **TypeScript**: Tipado estático para mayor robustez
- **Expo Router**: Navegación basada en sistema de archivos

### Gestión de Estado
- **Zustand**: Estado global ligero y performante
- **React Query (TanStack Query)**: Cache y sincronización de datos del servidor
- **AsyncStorage**: Persistencia local de configuraciones

### Visualización de Datos
- **React Native Chart Kit** o **Victory Native**: Gráficos de candlestick e indicadores
- **react-native-svg**: Renderizado de gráficos vectoriales

### Notificaciones
- **Expo Notifications**: Push notifications multiplataforma
- **expo-task-manager**: Background tasks para análisis periódico

### API y Datos
- **Axios**: Cliente HTTP para APIs de datos Forex
- **Alpha Vantage API** / **Twelve Data API**: Fuente de datos de precios (gratuitas con límites)
- **WebSocket** (opcional): Actualizaciones en tiempo real

### UI/UX
- **React Native Paper**: Librería de componentes Material Design
- **expo-linear-gradient**: Efectos visuales
- **react-native-reanimated**: Animaciones fluidas
- **@react-native-async-storage/async-storage**: Almacenamiento local

### Testing
- **Jest**: Unit testing
- **React Native Testing Library**: Component testing
- **Detox** (opcional): E2E testing

## 🏗 Arquitectura del Sistema

### Patrón Arquitectónico: Clean Architecture + Feature-Based

```
┌─────────────────────────────────────────────────────┐
│                  Presentation Layer                  │
│  (Screens, Components, Hooks, Navigation)           │
└────────────────┬────────────────────────────────────┘
                 │
┌────────────────┴────────────────────────────────────┐
│              Application Layer                       │
│  (State Management, Use Cases, ViewModels)          │
└────────────────┬────────────────────────────────────┘
                 │
┌────────────────┴────────────────────────────────────┐
│                Domain Layer                          │
│  (Entities, Business Logic, Indicators)             │
└────────────────┬────────────────────────────────────┘
                 │
┌────────────────┴────────────────────────────────────┐
│              Infrastructure Layer                    │
│  (API Clients, Storage, Notifications)              │
└─────────────────────────────────────────────────────┘
```

## 📁 Estructura de Carpetas

```
/workspace/
├── app/                          # Expo Router (navegación)
│   ├── (tabs)/                   # Tab navigation
│   │   ├── index.tsx            # Home/Signals screen
│   │   ├── education.tsx        # Educational content
│   │   ├── history.tsx          # Signal history
│   │   └── settings.tsx         # Settings & customization
│   ├── _layout.tsx              # Root layout
│   └── signal/[id].tsx          # Signal detail screen
│
├── src/
│   ├── core/                    # Domain Layer
│   │   ├── entities/            # Core business entities
│   │   │   ├── CurrencyPair.ts
│   │   │   ├── Signal.ts
│   │   │   ├── Candle.ts
│   │   │   └── Indicator.ts
│   │   ├── indicators/          # Technical analysis logic
│   │   │   ├── BollingerBands.ts
│   │   │   ├── RSI.ts
│   │   │   ├── MovingAverage.ts
│   │   │   └── SignalGenerator.ts
│   │   └── constants/
│   │       ├── currencyPairs.ts
│   │       └── timeframes.ts
│   │
│   ├── services/                # Infrastructure Layer
│   │   ├── api/
│   │   │   ├── forexApi.ts      # API client abstraction
│   │   │   ├── alphaVantage.ts  # Alpha Vantage implementation
│   │   │   └── types.ts
│   │   ├── storage/
│   │   │   └── storage.ts       # AsyncStorage wrapper
│   │   ├── notifications/
│   │   │   └── notificationService.ts
│   │   └── background/
│   │       └── backgroundTasks.ts
│   │
│   ├── store/                   # Application Layer
│   │   ├── signalsStore.ts      # Signals state
│   │   ├── settingsStore.ts     # User preferences
│   │   ├── themeStore.ts        # Theme configuration
│   │   └── historyStore.ts      # Signal history
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── useSignals.ts
│   │   ├── useForexData.ts
│   │   ├── useNotifications.ts
│   │   └── useTheme.ts
│   │
│   ├── components/              # Presentation Layer
│   │   ├── charts/
│   │   │   ├── CandlestickChart.tsx
│   │   │   ├── IndicatorOverlay.tsx
│   │   │   └── PriceChart.tsx
│   │   ├── signals/
│   │   │   ├── SignalCard.tsx
│   │   │   ├── SignalList.tsx
│   │   │   └── ConfidenceLevel.tsx
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Header.tsx
│   │   └── education/
│   │       ├── IndicatorExplanation.tsx
│   │       └── TutorialCard.tsx
│   │
│   ├── utils/                   # Helper functions
│   │   ├── calculations.ts
│   │   ├── formatting.ts
│   │   └── validation.ts
│   │
│   ├── config/                  # Configuration
│   │   ├── api.config.ts
│   │   ├── theme.config.ts
│   │   └── constants.ts
│   │
│   └── types/                   # TypeScript types
│       ├── api.types.ts
│       ├── signal.types.ts
│       └── navigation.types.ts
│
├── assets/                      # Static assets
│   ├── icons/
│   ├── images/
│   └── fonts/
│
├── docs/                        # Documentation
│   ├── architecture.md
│   ├── prompt.md
│   ├── USER_MANUAL.md
│   └── API_DOCS.md
│
├── __tests__/                   # Tests
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── app.json                     # Expo configuration
├── package.json
├── tsconfig.json
├── babel.config.js
└── README.md
```

## 🔄 Flujo de Datos

### 1. Obtención de Datos de Mercado
```
API Provider (Alpha Vantage) 
    → forexApi.ts (service)
    → React Query cache
    → useForexData hook
    → signalsStore (Zustand)
    → Components
```

### 2. Generación de Señales
```
Raw Price Data
    → Technical Indicators (RSI, BB, MA)
    → SignalGenerator.ts
    → Signal Evaluation (confidence level)
    → signalsStore
    → Notification Service (if alert criteria met)
    → UI Update
```

### 3. Configuración de Usuario
```
Settings Screen
    → settingsStore
    → AsyncStorage (persistence)
    → Signal recalculation (if needed)
```

## 🎯 Componentes Principales

### 1. **Technical Indicators Engine**
Módulo puro de cálculos matemáticos sin dependencias:
- `BollingerBands.ts`: Cálculo de bandas superior/inferior
- `RSI.ts`: Relative Strength Index
- `MovingAverage.ts`: SMA y EMA
- `SignalGenerator.ts`: Lógica de combinación de indicadores

### 2. **Forex Data Service**
Abstracción de la fuente de datos:
- Interface genérica para cambiar providers fácilmente
- Rate limiting y error handling
- Cache de datos históricos
- Actualización periódica (15 min configurable)

### 3. **Signal Management**
- Detección de condiciones de entrada
- Cálculo de nivel de confianza (bajo/medio/alto)
- Filtrado de señales falsas
- Historial de señales con timestamps

### 4. **Notification System**
- Push notifications cuando se detecta señal
- Configuración de frecuencia por usuario
- Background task para análisis periódico
- Local notifications si app en background

### 5. **Charting System**
- Candlestick charts interactivos
- Overlay de indicadores (BB, MA)
- Zoom y pan gestures
- Marcadores de señales en el gráfico

## 🎨 Sistema de Diseño

### Colores Base (Dark Mode)
```typescript
{
  primary: '#00D4AA',      // Teal vibrante
  secondary: '#6366F1',    // Indigo
  background: '#0F1419',   // Casi negro
  surface: '#1A1F26',      // Gris oscuro
  error: '#EF4444',        // Rojo
  success: '#10B981',      // Verde
  warning: '#F59E0B',      // Ámbar
  text: '#F9FAFB',         // Casi blanco
  textSecondary: '#9CA3AF' // Gris
}
```

### Colores Base (Light Mode)
```typescript
{
  primary: '#00A88E',
  secondary: '#4F46E5',
  background: '#FFFFFF',
  surface: '#F3F4F6',
  error: '#DC2626',
  success: '#059669',
  warning: '#D97706',
  text: '#111827',
  textSecondary: '#6B7280'
}
```

### Tipografía
- Headings: **Inter Bold** (600-700)
- Body: **Inter Regular** (400)
- Monospace (precios): **Roboto Mono** (500)

## 🔐 Seguridad y Privacidad

### Principios
1. **No almacenar datos financieros personales**
2. **No solicitar información bancaria**
3. **API keys en variables de entorno** (.env no commiteado)
4. **Disclaimer legal visible** en primera apertura y settings
5. **Solo lectura**: La app no ejecuta operaciones reales

### Compliance
- Disclaimer: "Las señales son solo educativas, no constituyen asesoría financiera"
- Sin registro de usuario requerido
- Sin tracking de datos personales
- Toda la configuración es local

## ⚡ Optimizaciones de Rendimiento

### 1. Cálculo de Indicadores
- Memoización de cálculos pesados
- Cálculo incremental (solo nuevos candles)
- Web Workers para cálculos en background (si disponible)

### 2. Renderizado de Gráficos
- Virtualización de lista de señales
- Throttling de actualizaciones de gráficos
- Lazy loading de componentes pesados

### 3. Gestión de API
- Rate limiting respeto de límites de API
- Cache inteligente con React Query
- Stale-while-revalidate pattern
- Fallback a datos cacheados si API falla

### 4. Background Tasks
- Análisis solo cuando hay conexión
- Battery-aware scheduling
- Notificaciones agrupadas

## 🧪 Estrategia de Testing

### Unit Tests
- Indicadores técnicos (cálculos matemáticos)
- Funciones de utilidad
- Store actions

### Integration Tests
- Flujo de generación de señales
- API integration
- Notification triggering

### E2E Tests (opcional)
- User journey completo
- Navegación entre pantallas
- Configuración de preferencias

## 📱 Configuración de Publicación

### iOS (App Store)
- Bundle ID: `com.tradesense.app`
- Minimum iOS version: 13.0
- Capabilities: Push Notifications, Background Fetch

### Android (Google Play)
- Package name: `com.tradesense.app`
- Minimum SDK: 23 (Android 6.0)
- Permissions: NOTIFICATIONS, INTERNET, ACCESS_NETWORK_STATE

## 🔄 Roadmap de Desarrollo

### Fase 1: Core (MVP)
- [x] Arquitectura y setup
- [ ] Indicadores técnicos
- [ ] API integration
- [ ] Generación básica de señales
- [ ] UI principal con gráficos
- [ ] Notificaciones básicas

### Fase 2: Enhancement
- [ ] Personalización de indicadores
- [ ] Historial de señales
- [ ] Modo oscuro/claro
- [ ] Sección educativa
- [ ] Múltiples pares de divisas

### Fase 3: Advanced
- [ ] Backtesting básico
- [ ] Estadísticas de rendimiento
- [ ] Alertas personalizadas
- [ ] Exportación de datos
- [ ] Gamificación (opcional)

## 📚 Referencias Técnicas

- [Bollinger Bands Formula](https://www.investopedia.com/terms/b/bollingerbands.asp)
- [RSI Calculation](https://www.investopedia.com/terms/r/rsi.asp)
- [Moving Averages Guide](https://www.investopedia.com/terms/m/movingaverage.asp)
- [Alpha Vantage API Docs](https://www.alpha-vantage.co/documentation/)
- [Expo Documentation](https://docs.expo.dev/)

## 🤝 Contribución y Mantenimiento

### Code Style
- ESLint + Prettier
- TypeScript strict mode
- Conventional Commits

### Git Workflow
- Feature branches
- PR reviews required
- CI/CD con GitHub Actions

---

**Última actualización**: 2025-11-10
**Versión**: 1.0.0
**Autor**: AI Development Agent
