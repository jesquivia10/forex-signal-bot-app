# TradeSense — App educativa de señales Forex

TradeSense es una aplicación móvil (React Native + Expo) que ayuda a traders principiantes a interpretar oportunidades en el mercado Forex combinando Bandas de Bollinger, RSI y medias móviles. Las alertas son educativas y no constituyen asesoría financiera.

## Características principales
- Dashboard con señales en tiempo real, nivel de confianza y resumen de indicadores.
- Generación automática de indicadores técnicos (Bollinger, RSI, SMA/EMA).
- Historial persistente de señales y módulo de educación integrada.
- Personalización de umbrales, pares monitoreados y frecuencia de notificaciones.
- Soporte para modo claro/oscuro y datos simulados cuando no hay API key.

## Arquitectura
- **Expo Router + React Native** para navegación por pestañas.
- **Redux Toolkit** para estado global y orquestación de señales.
- **Clean Architecture** dividida en capas de Presentación, Dominio y Datos.
- **AsyncStorage** para persistir historial y preferencias.
- Mock data fallback cuando la API externa no está disponible.

Más detalles en `docs/architecture.md`.

## Requisitos y ejecución
1. Instala dependencias: `cd app && npm install`.
2. Configura la API key de Alpha Vantage (`docs/installation.md`).
3. Ejecuta la app: `npm start` (Expo dev tools).
4. Corre las pruebas: `npm test -- --watchAll=false`.

## Documentación
- `docs/installation.md`: instalación y variables de entorno.
- `docs/manual_usuario.md`: guía funcional para usuarios finales.
- `docs/pruebas.md`: estrategia de pruebas manuales y automáticas.
- `docs/ui_kit.md`: paleta, componentes y directrices de estilo.
- `docs/architecture.md`: diseño técnico y roadmap.

## Estructura relevante
```
app/
  app/              # Pantallas y navegación (Expo Router)
  src/
    application/    # Store Redux, slices y hooks
    domain/         # Modelos, servicios e indicadores
    data/           # Repositorios y clientes API
    presentation/   # Componentes UI y temas
docs/               # Documentación técnica y de usuario
assets/             # Íconos y mockups
```

## Disclaimer
TradeSense es una herramienta educativa. Las señales y alertas no deben interpretarse como recomendaciones de inversión. Utiliza siempre cuentas demo y aplica tu propio criterio de gestión de riesgo.

