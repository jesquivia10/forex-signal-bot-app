# Arquitectura del Proyecto - TradeSense

## Visión General

**TradeSense** es una aplicación móvil multiplataforma desarrollada con Flutter que proporciona señales de trading educativas basadas en análisis técnico para el mercado Forex.

## Stack Tecnológico

- **Framework**: Flutter 3.x
- **Lenguaje**: Dart
- **Estado**: Provider/Riverpod
- **Gráficos**: fl_chart
- **HTTP**: dio
- **Almacenamiento local**: shared_preferences, sqflite
- **Notificaciones**: flutter_local_notifications
- **API de Forex**: Alpha Vantage / Twelve Data (con fallback a datos mock para desarrollo)

## Arquitectura de Capas

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│  (Screens, Widgets, ViewModels)        │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│         Business Logic Layer            │
│  (Services, Use Cases, Signal Engine)  │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│         Data Layer                      │
│  (Repositories, API Clients, Cache)    │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│         External Services               │
│  (Forex API, Notifications, Storage)   │
└─────────────────────────────────────────┘
```

## Estructura de Directorios

```
lib/
├── main.dart
├── core/
│   ├── constants/
│   ├── theme/
│   ├── utils/
│   └── errors/
├── data/
│   ├── models/
│   ├── repositories/
│   ├── datasources/
│   │   ├── remote/
│   │   └── local/
│   └── api/
├── domain/
│   ├── entities/
│   ├── repositories/
│   └── usecases/
├── presentation/
│   ├── screens/
│   │   ├── home/
│   │   ├── signals/
│   │   ├── charts/
│   │   ├── education/
│   │   ├── settings/
│   │   └── history/
│   ├── widgets/
│   │   ├── charts/
│   │   ├── indicators/
│   │   └── common/
│   └── providers/
└── services/
    ├── indicators/
    ├── signals/
    └── notifications/
```

## Componentes Principales

### 1. Data Layer

#### Models
- `CurrencyPair`: Representa un par de divisas (EUR/USD, GBP/USD, etc.)
- `PriceData`: Datos de precio OHLCV
- `IndicatorData`: Resultados de cálculos de indicadores
- `TradingSignal`: Señal generada con nivel de confianza
- `SignalHistory`: Historial de señales para backtesting

#### Repositories
- `ForexRepository`: Abstracción para obtener datos de mercado
- `SignalRepository`: Gestión de señales e historial
- `SettingsRepository`: Configuración del usuario

#### Data Sources
- `ForexRemoteDataSource`: API de datos de Forex
- `ForexLocalDataSource`: Cache local (SQLite)
- `SettingsLocalDataSource`: Preferencias del usuario

### 2. Domain Layer

#### Entities
- Entidades de dominio puras (sin dependencias de frameworks)

#### Use Cases
- `GetMarketDataUseCase`: Obtener datos de mercado
- `CalculateIndicatorsUseCase`: Calcular indicadores técnicos
- `GenerateSignalsUseCase`: Generar señales de trading
- `GetSignalHistoryUseCase`: Obtener historial de señales
- `BacktestStrategyUseCase`: Ejecutar backtesting

### 3. Business Logic Layer

#### Indicator Services
- `BollingerBandsService`: Cálculo de Bandas de Bollinger
- `RSIService`: Cálculo de RSI
- `MovingAverageService`: Cálculo de SMA/EMA

#### Signal Engine
- `SignalGenerator`: Lógica principal de generación de señales
  - Combina indicadores según reglas definidas
  - Calcula nivel de confianza
  - Filtra señales falsas

### 4. Presentation Layer

#### Screens
- `HomeScreen`: Pantalla principal con señales activas
- `ChartScreen`: Gráfico interactivo con indicadores
- `EducationScreen`: Contenido educativo sobre indicadores
- `SettingsScreen`: Configuración y personalización
- `HistoryScreen`: Historial y backtesting

#### Providers (State Management)
- `MarketDataProvider`: Estado de datos de mercado
- `SignalsProvider`: Estado de señales activas
- `SettingsProvider`: Estado de configuración
- `ThemeProvider`: Estado del tema (claro/oscuro)

#### Widgets
- `PriceChart`: Gráfico de precios con indicadores superpuestos
- `SignalCard`: Tarjeta de señal con detalles
- `IndicatorPanel`: Panel de indicadores
- `ConfidenceBadge`: Badge de nivel de confianza

## Flujo de Datos

### Obtención y Procesamiento de Señales

```
1. Timer cada 15 minutos → Trigger
2. MarketDataProvider → Solicita datos
3. ForexRepository → Obtiene datos (API o cache)
4. CalculateIndicatorsUseCase → Calcula indicadores
5. GenerateSignalsUseCase → Genera señales
6. SignalGenerator → Aplica reglas de estrategia
7. SignalsProvider → Actualiza estado
8. UI → Muestra señales
9. NotificationService → Envía notificaciones si aplica
```

## Estrategia de Señales

### Señal de Compra
**Condiciones:**
- Precio toca o cruza banda inferior de Bollinger
- RSI < 30 (sobreventa)
- EMA20 > EMA50 (tendencia alcista) - Confirmación opcional
- Precio por encima de SMA50 - Confirmación adicional

**Nivel de Confianza:**
- Alto: Todas las condiciones + confirmaciones
- Medio: Condiciones principales sin confirmaciones
- Bajo: Solo Bollinger + RSI

### Señal de Venta
**Condiciones:**
- Precio toca o cruza banda superior de Bollinger
- RSI > 70 (sobrecompra)
- EMA20 < EMA50 (tendencia bajista) - Confirmación opcional
- Precio por debajo de SMA50 - Confirmación adicional

**Nivel de Confianza:**
- Alto: Todas las condiciones + confirmaciones
- Medio: Condiciones principales sin confirmaciones
- Bajo: Solo Bollinger + RSI

## Configuración Personalizable

- Períodos de Bollinger (default: 20)
- Desviaciones estándar (default: 2)
- Períodos de RSI (default: 14)
- Umbrales de RSI (default: 30/70)
- Períodos de MA (default: 20, 50)
- Tipo de MA (SMA/EMA)
- Frecuencia de actualización (15, 30, 60 min)
- Pares de divisas a monitorear

## Persistencia de Datos

### SQLite Database
- Tabla `price_data`: Histórico de precios OHLCV
- Tabla `signals`: Historial de señales generadas
- Tabla `backtest_results`: Resultados de backtesting

### Shared Preferences
- Configuración del usuario
- Preferencias de tema
- Configuración de notificaciones

## Notificaciones

- Push notifications locales cuando se detecta señal relevante
- Configurable por nivel de confianza (solo alto/medio/alto)
- Configurable por frecuencia (15/30/60 min)

## Manejo de Errores

- Retry automático en fallos de red
- Cache de datos para operación offline
- Mensajes de error amigables al usuario
- Logging de errores para debugging

## Testing

- Unit tests para servicios de indicadores
- Unit tests para lógica de señales
- Widget tests para componentes críticos
- Integration tests para flujos principales

## Seguridad y Legalidad

- Disclaimer legal visible en primera ejecución
- No almacenamiento de datos financieros del usuario
- API keys en variables de entorno (no en código)
- Validación de datos de entrada

## Optimizaciones

- Caché inteligente de datos de mercado
- Cálculos de indicadores optimizados
- Lazy loading de gráficos históricos
- Debouncing en actualizaciones de UI

## Roadmap Futuro

- Integración con cuentas demo (solo lectura)
- Sistema de gamificación educativa
- Exportación de señales a CSV
- Múltiples estrategias configurables
- Análisis de sentimiento (opcional)
