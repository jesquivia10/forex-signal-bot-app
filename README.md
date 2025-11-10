# TradeSense · Forex Signal Companion

TradeSense es una aplicación educativa de señales Forex diseñada para ayudar a traders principiantes e intermedios a comprender y evaluar oportunidades del mercado mediante una estrategia basada en Bandas de Bollinger, RSI y medias móviles (SMA/EMA). La app no ejecuta operaciones reales: su foco está en el aprendizaje, la visualización de indicadores y la personalización de alertas.

## Características principales
- **Dashboard en tiempo real** con señales activas, nivel de confianza y acceso al detalle con gráficos interactivos.
- **Motor de análisis técnico** que calcula indicadores de forma periódica (15 minutos por defecto) y permite personalizar parámetros.
- **Historial persistente** de señales con métricas rápidas y filtros por par.
- **Centro educativo** con módulos temáticos sobre Bollinger, RSI y MAs.
- **Notificaciones push & background fetch** opcionales para recibir nuevas señales según la frecuencia elegida.
- **Tema claro/oscuro** automático y manual.

## Requisitos
- Node.js ≥ 18
- npm ≥ 9
- Expo CLI (opcional pero recomendado): `npm install -g expo-cli`
- Cuenta gratuita y API Key de [Alpha Vantage](https://www.alphavantage.co/support/#api-key)

## Configuración inicial
1. Clonar el repositorio y acceder a la carpeta del proyecto:
   ```bash
   git clone <repo-url>
   cd app/trade-sense
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Definir variables de entorno creando un archivo `.env` en la raíz del proyecto Expo:
   ```env
   EXPO_PUBLIC_ALPHA_VANTAGE_KEY=tu_api_key
   EXPO_PUBLIC_APP_ENV=development
   ```

## Scripts disponibles
- `npm run start` · Inicia el servidor de desarrollo de Expo.
- `npm run android` / `npm run ios` / `npm run web` · Abre la app en el dispositivo/emulador indicado.
- `npm run test` · Ejecuta pruebas unitarias de motor de indicadores y motor de señales.

## Estructura relevante
```
app/trade-sense
├── src
│   ├── app               # Bootstrap, navegación y providers
│   ├── config            # Constantes y utilidades de entorno
│   ├── data              # Clientes API, repositorios y mapeadores
│   ├── domain            # Entidades, casos de uso y servicios de negocio
│   ├── infrastructure    # Notificaciones y tareas en background
│   ├── presentation      # Screens, componentes y hooks UI
│   └── tests             # Pruebas unitarias
└── docs
    ├── architecture.md
    ├── installation.md
    └── user-guide.md
```

## Documentación adicional
- `docs/architecture.md` · Descripción detallada de la arquitectura, dependencias y flujo de datos.
- `docs/installation.md` · Guía paso a paso para levantar el proyecto y configurar Expo.
- `docs/user-guide.md` · Manual funcional orientado al usuario final.

## Notas importantes
- La app consume Alpha Vantage en modo educativo. Respeta los límites de tasa gratuitos (5 llamadas/min).
- Para recibir notificaciones push en dispositivos físicos, regístrate en Expo y configura los certificados según la [guía oficial](https://docs.expo.dev/push-notifications/overview/).
- El análisis en background se registra mediante `expo-background-fetch` con un intervalo mínimo recomendado de 15 minutos.
- Este proyecto se entrega sin funcionalidades de trading ni conexión a cuentas reales; cualquier decisión de inversión es responsabilidad del usuario.

