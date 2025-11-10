## Arquitectura de TradeSense

### 1. Visión general
- **Objetivo**: Aplicación móvil educativa para generar señales de trading en Forex usando Bandas de Bollinger, RSI y medias móviles (SMA/EMA).
- **Plataforma**: Aplicación móvil multiplataforma desarrollada con **React Native (Expo)** para acelerar el desarrollo y garantizar despliegue en iOS/Android.
- **Patrón arquitectónico**: Clean Architecture adaptada al entorno móvil, separando capas de Presentación, Dominio y Datos. Gestión del estado con **Redux Toolkit + RTK Query** para sincronizar datos y caché.
- **Actualización de datos**: Pull periódico (15 minutos configurable) a proveedor de datos Forex (Alpha Vantage) con WebSocket opcional para futuro tiempo real.

### 2. Componentes principales
- **Capa de Presentación**
  - Navegación con **React Navigation** (stack + tabs).
  - Pantallas: `Dashboard`, `SignalDetail`, `Education`, `Settings`, `History`, `Backtesting`.
  - Componentes UI reutilizables: gráficos (via `react-native-svg` + `react-native-chart-kit`), cards de señal, formularios de configuración.
  - Tematización (claro/oscuro) gestionada con `styled-components` y ThemeProvider.
- **Capa de Dominio**
  - **Casos de uso**: `FetchMarketSnapshot`, `GenerateSignals`, `FetchSignalHistory`, `RunBacktest`, `UpdateUserPreferences`.
  - **Modelos**: `CurrencyPair`, `Candle`, `IndicatorSet`, `Signal`, `UserPreferences`, `BacktestResult`.
  - **Servicios**: Estrategia de indicadores (`IndicatorService`), motor de señales (`SignalEngine`), reglas de confianza.
- **Capa de Datos**
  - **Fuentes remotas**: API REST de Alpha Vantage (o proveedor similar). Encapsulada en `ForexApiClient`.
  - **Fuentes locales**: Almacenamiento en `AsyncStorage` para preferencias, historial de señales y resultados de backtesting.
  - **Repositorios**: `MarketRepository`, `SignalRepository`, `PreferencesRepository`.
  - **Sincronización**: Scheduler con `expo-task-manager` + `expo-background-fetch` para obtener datos en intervalos configurables.

### 3. Flujo de datos
1. Scheduler dispara `FetchMarketSnapshot`.
2. `MarketRepository` solicita precios recientes al API, almacena caché local.
3. `SignalEngine` calcula indicadores (Bollinger, RSI, SMA/EMA) y evalúa reglas => genera señales.
4. Señales se guardan en `SignalRepository` (historial) y se despachan al estado global.
5. UI observa estado con Redux, reactualiza listas y gráficos.
6. Notificaciones push mediante `expo-notifications` cuando las señales alcanzan niveles configurados.

### 4. Integraciones externas
- **Proveedor de precios**: Alpha Vantage (API key, límite de 5 llamadas/min). Implementar capa de abstracción para fácil cambio de proveedor.
- **Notificaciones push**: Expo Push Notification Service.
- **Analítica opcional**: `expo-analytics-segment` para seguimiento de uso (sin datos sensibles).
- **Gestión de secretos**: `EXPO_PUBLIC_ALPHA_VANTAGE_API_KEY` inyectada vía `app.config.ts` y fallback a datos simulados.

### 5. Estrategia técnica
  - **Indicadores**:
  - Bollinger Bands: cálculo manual usando dataset de velas (20 periodos, ±2 desviaciones).
  - RSI: 14 periodos, configurable.
  - SMA/EMA: 20 y 50 periodos, configurable por usuario.
- **Nivel de confianza**: función ponderada según coincidencia de indicadores y tendencia de medias.
  - **Backtesting**: Ejecución local en background sobre datos históricos descargados, visualización con `react-native-chart-kit`.

### 6. Calidad y pruebas
- **Linting/formato**: ESLint + Prettier + TypeScript strict.
- **Pruebas unitarias**: Jest para lógica de indicadores y repositorios.
- **Pruebas de integración**: React Native Testing Library para componentes clave.
- **E2E**: Detox (opcional, fuera del alcance inicial).

### 7. Seguridad y cumplimiento
- No se almacenan datos financieros ni personales sensibles.
- Disclaimer legal visible en onboarding y pantalla principal.
- Cumplimiento con políticas de App Store/Google Play para apps educativas.

### 8. Roadmap incremental
1. **MVP**: Dashboard con señales en tiempo real, configuración básica, modo oscuro/claro.
2. **Iteración 2**: Historial, backtesting básico, notificaciones push.
3. **Iteración 3**: Gamificación, integración demo accounts, analítica avanzada.
