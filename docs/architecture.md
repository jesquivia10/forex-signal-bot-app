## Visión general
- **Nombre de la app:** `TradeSense`
- **Plataforma:** React Native (Expo) con TypeScript, compatible con iOS y Android.
- **Arquitectura:** Clean Architecture modularizada con separación en capas `app` → `presentation` → `domain` → `data`.
- **Estado & datos:** React Navigation, Zustand (estado local), TanStack Query (estado remoto/cache), Expo Notifications, AsyncStorage/SQLite para persistencia ligera.
- **Objetivo:** Proveer señales educativas basadas en Bandas de Bollinger, RSI y MAs, con análisis cada 15 minutos y notificaciones configurables.

## Capas y responsabilidades

### 1. App (composition root)
- Configuración Expo, bootstrap, providers globales.
- Registro de temas (light/dark), fuentes y assets.
- Configuración de navegación y deep links.
- Setup de notificaciones push, manejo de permisos.

### 2. Presentación
- **UI Screens** (React Native + styled components):
  - `DashboardScreen`: señales activas, overview de pares.
  - `PairDetailScreen`: gráfico interactivo con indicadores, resumen y confianza.
  - `SignalsHistoryScreen`: listado filtrable de señales pasadas, métricas básicas.
  - `EducationScreen`: módulos educativos, logros/gamificación.
  - `SettingsScreen`: configuración de alertas, períodos, niveles RSI, modo oscuro.
  - `LegalScreen`: disclaimer y políticas.
- **Componentes UI reutilizables**: tarjetas de señal, gráfico con overlays, badges de confianza, modales educativos.
- **ViewModels/Controllers (Hooks)**: encapsulan lógica de presentación, consumen `domain` mediante servicios expuestos via hooks (`useActiveSignals`, `usePairDetail`, `useSettings`).
- **Internacionalización**: soporte multilenguaje con i18n (es/en) usando `react-i18next`.

### 3. Dominio
- **Entidades**: `CurrencyPair`, `Candle`, `IndicatorSnapshot`, `Signal`, `UserSettings`, `NotificationPreference`.
- **Casos de uso**:
  - `FetchLatestMarketData`
  - `GenerateSignalsForPairs`
  - `UpdateIndicatorParameters`
  - `GetSignalsHistory`
  - `ScheduleAlertNotifications`
  - `RunBacktest`
- **Reglas de negocio**: combinación de indicadores, cálculo de confianza (ponderación RSI, desviación de Bollinger, confirmación MA), filtros de tendencia.
- **Servicios**: `IndicatorEngine` (cálculo de Bollinger/RSI/SMA/EMA), `ConfidenceScorer`, `BacktestEngine`.
- Interfaces abstractas que desacoplan dominio de datos/presentación.

### 4. Datos
- **Fuentes externas**:
  - `ForexPriceApi`: cliente HTTP (Axios) para Alpha Vantage (o proveedor configurable), con rate limiting y reintentos.
  - Normalización de respuestas a entidades `Candle`.
- **Persistencia local**:
  - `SignalsRepository`: almacenamiento en SQLite (expo-sqlite) de señales generadas.
  - `SettingsRepository`: AsyncStorage para preferencias del usuario.
- **Sincronización**:
  - Programador (Expo Task Manager + Background Fetch) para actualizar datos cada 15 minutos.
  - Gestión de fallos/reintentos con backoff exponencial.

## Flujo de datos
1. `BackgroundFetch` dispara cada 15 minutos → `FetchLatestMarketData` obtiene velas recientes por par.
2. `IndicatorEngine` calcula indicadores sobre ventana deslizante configurada.
3. `SignalEngine` evalúa reglas y guarda nuevas señales en `SignalsRepository`.
4. `ScheduleAlertNotifications` genera notificación push si aplica y según preferencias.
5. UI (TanStack Query) consulta `SignalsRepository`/API, las vistas se actualizan automáticamente.

## Dependencias clave
- **Infraestructura**: Expo SDK, React Navigation, react-native-svg, victory-native (gráficos), Expo Notifications, Expo Task Manager, Expo Background Fetch.
- **Datos**: Axios, TanStack Query, expo-sqlite, AsyncStorage.
- **Estado/UI**: Zustand, react-i18next, React Native Paper + estilos utilitarios dedicados.
- **Testing**: Jest, React Native Testing Library, MSW (mock API), Detox (E2E opcional).
- **Linting/Calidad**: ESLint, Prettier, TypeScript strict, Husky + lint-staged.

## Módulos y estructura de carpetas
```
app/
  trade-sense/
    app.json / expo-config
    package.json
    src/
      app/            # bootstrap, providers, navigation
      presentation/
        screens/
        components/
        hooks/
        theme/
        i18n/
      domain/
        entities/
        usecases/
        services/
      data/
        api/
        repositories/
        datasources/
        mappers/
      infrastructure/
        notifications/
        background/
        storage/
      config/
      utils/
      tests/
        unit/
        integration/
        fixtures/
```

## Estrategia de indicadores y señales
- Bollinger Bands (20 periodos, 2σ) calculadas sobre cierres.
- RSI (14 periodos) para detectar sobrecompra/sobreventa.
- SMA/EMA (20/50) como filtro de tendencia: señales solo válidas si precio respeta tendencia.
- Nivel de confianza: combinación ponderada (40% RSI, 40% Bollinger proximity, 20% MA alignment).
- Alertas visuales (colores, badges) y auditivas (tono corto configurado).
- Backtesting: ejecutar casos de uso sobre historiales descargados para calcular win-rate simulado.

## UI/UX
- Tema oscuro/claro con toggles; respetar ajustes del sistema.
- Dashboard tipo cards con estado del mercado y tiempo restante para próxima actualización.
- Gráfico interactivo con zoom/pan, overlays de indicadores.
- Educación con secciones modulares, quizzes ligeros, logros.
- Integración con tutorial inicial y tooltips contextuales.

## Notificaciones y tareas en segundo plano
- Expo Notifications para push y local.
- Expo Background Fetch + Task Manager para análisis recurrente.
- Guardar timestamp de último análisis para evitar duplicados.

## Seguridad y compliance
- No almacenar credenciales financieras.
- Disclaimer en onboarding y menú legal.
- Uso de HTTPS y sanitización de datos. Manejo de errores y caídas del proveedor.
- Monitor de consumo API con métricas básicas (logging + Sentry).

## Build, CI/CD y despliegue
- Scripts npm: `yarn lint`, `yarn test`, `yarn test:e2e`, `yarn build`.
- Configuración Expo EAS para builds nativos.
- GitHub Actions (futuro) para lint/test/build en PRs.
- Versionado semántico, changelog automático.

## Pruebas y aseguramiento de calidad
- Unit tests para `IndicatorEngine`, `SignalEngine`, casos de uso.
- Tests de integración con MSW simulando API.
- Tests de snapshot/UI con RN Testing Library.
- E2E con Detox para flujos críticos (dashboard → detalle → ajustes).
- Pruebas de rendimiento: medir tiempo de cálculo de indicadores y render de gráficos.
- Monitoreo de precisión: comparar señales con datos conocidos, registrar métricas.

## Roadmap incremental
1. MVP: Dashboard, señales básicas, settings, disclaimer, fetching manual.
2. Iteración 2: Background fetch, notificaciones push, historial local.
3. Iteración 3: Educación gamificada, backtesting básico, integración demo accounts.

## Riesgos y mitigaciones
- **Límites API**: cache + fallback a proveedor secundario.
- **Cálculos costosos**: optimizar con workers/batching.
- **Notificaciones**: validar permisos, fallback a alertas en-app.
- **Datos inconsistentes**: validaciones y manejo de errores con retroalimentación al usuario.

## Métricas clave
- Latencia de actualización < 5s post request.
- Generación de señal < 200ms.
- Engagement educativo (tiempo en módulo, logros completados).
- Precisión estimada de señales (registro en backtesting).
