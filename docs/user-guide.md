## Manual de usuario · TradeSense

### 1. Inicio rápido
1. Abra la app y conceda permisos de notificaciones si desea recibir alertas.
2. En el **Dashboard** verá las señales activas. Cada tarjeta incluye el par, la confianza estimada y accesos rápidos.
3. Toque **Ver detalles** para visualizar el gráfico con velas, Bandas de Bollinger y medias móviles que justifican la señal.

### 2. Pantallas principales

#### Dashboard
- Lista las señales vigentes ordenadas por fecha.
- Muestra la confianza basada en composición de RSI + distancia a bandas + alineación de medias.
- Refresca automáticamente cada 15 minutos (configurable).

#### Historial
- Consulta el registro de señales anteriores y métricas agregadas.
- Permite verificar el sesgo alcista/bajista y la evolución temporal.

#### Educación
- Biblioteca auto-guiada con módulos sobre Bollinger, RSI y medias móviles.
- Incluye acciones rápidas para marcar progreso y retomar lecciones.

#### Ajustes
- Activa o desactiva notificaciones push.
- Define la frecuencia (15/30/60 min) y la preferencia de pares monitoreados.
- Ajusta los parámetros de indicadores (por ahora presets estándar 30/70 en RSI, 20/50 en MAs).

#### Legal
- Contiene el aviso de responsabilidad financiera.

### 3. Interpretar una señal
1. **Dirección**: Compra o Venta, determinada por la interacción precio/banda y el estado del RSI.
2. **Confianza**: porcentaje (0–100) ponderado:
   - 40% proximidad a banda relevante.
   - 40% posición del RSI frente a umbral.
   - 20% alineación de medias móviles.
3. **Razonamiento**: lista textual de los factores que dispararon la alerta.
4. **Detalle gráfico**: vela con overlays, rango de precios y datos de indicadores.

### 4. Notificaciones
- Se envían únicamente si el usuario las habilita en Ajustes.
- El análisis en background se registra mediante `expo-background-fetch`. Si el dispositivo restringe tareas en segundo plano, el refresco puede demorarse.
- Las notificaciones resumen par, dirección y confianza; al tocarlas, la app muestra el detalle.

### 5. Buenas prácticas de uso
- Utilice las señales como material formativo; valide siempre con análisis adicional.
- Ajuste la frecuencia de alertas según su disponibilidad para revisarlas.
- Revise periódicamente el historial para medir la consistencia de la estrategia.
- Consulte el centro educativo para comprender el contexto de cada indicador.

### 6. Limitaciones conocidas
- Se requiere conexión a internet para obtener datos de Alpha Vantage.
- El API gratuito posee límites de llamadas; en caso de excederlos la app mostrará errores de tasa.
- Las personalizaciones avanzadas de indicadores (niveles personalizados más allá de RSI/MAs) llegarán en iteraciones futuras.
