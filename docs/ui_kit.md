## Guía de estilo TradeSense

### 1. Identidad visual
- **Nombre:** TradeSense
- **Palette primaria:**
  - Azul acento: `#2563EB`
  - Fondo claro: `#F4F6FA`
  - Fondo oscuro: `#0B1120`
  - Texto principal: `#1C1C1E` (claro) / `#F9FAFB` (oscuro)
- **Colores de estado:**
  - Compra/positivo: `#10B981`
  - Venta/negativo: `#EF4444`
  - Advertencia: `#F59E0B`

### 2. Componentes UI
- **SignalCard**
  - Fondo elevado con sombra suave.
  - Badge de confianza con variaciones de color (alto, medio, bajo).
  - Lista de razones con bullets y texto explicativo.
- **SummaryTile**
  - Tarjetas pequeñas con métricas clave.
- **PriceChart**
  - Línea azul (acento) con sombra.
  - Etiquetas horarias abreviadas.
- **IndicatorSummary**
  - Tabla vertical con divisores y acento en valores.

### 3. Tipografía
- Sistema tipográfico nativo (SF Pro / Roboto).
- Jerarquía:
  - Titulares (24-28 px, bold).
  - Subtítulos (16-18 px, semibold).
  - Texto base (14-16 px, regular).
  - Metadatos (12 px, medium).

### 4. Iconografía
- Expo vector icons (FontAwesome).
- Iconos sugeridos:
  - `line-chart` (dashboard).
  - `clock-o` (historial).
  - `graduation-cap` (academy).
  - `sliders` (ajustes).

### 5. Layout
- Padding general: 16 px.
- Radios: 16 px en tarjetas y contenedores.
- Uso de `gap` para consistencia entre elementos (8-12 px).

### 6. Estados y accesibilidad
- Contraste AA garantizado en ambos temas.
- Indicadores de estado (colores + texto) para no depender solo del color.
- Animaciones futuras: se recomienda usar Reanimated o gestos suaves para transiciones.
