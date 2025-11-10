## Instalación y configuración

### 1. Requisitos previos
- Node.js 18 LTS o superior.
- npm 9+ (instalado con Node).
- Cuenta gratuita en [Alpha Vantage](https://www.alphavantage.co/support/#api-key) para obtener una API key.
- Expo CLI (`npm install --global expo-cli`) opcional para comandos globales.

### 2. Clonar y preparar el proyecto
```bash
git clone <REPO_URL>
cd app
npm install
```

### 3. Configurar variables de entorno
Edita `app.json` o usa `app.config.ts` para inyectar la key de Alpha Vantage. Durante el desarrollo puedes exportar una variable:
```bash
export EXPO_PUBLIC_ALPHA_VANTAGE_API_KEY=<tu_api_key>
```
Luego ejecuta:
```bash
npx expo start
```

Sin key el sistema usa datos simulados para facilitar pruebas sin conexión.

### 4. Ejecutar la aplicación
- **Modo interactivo:** `npm start`
- **Android (emulador o dispositivo):** `npm run android`
- **iOS (requiere macOS):** `npm run ios`
- **Web (vista previa):** `npm run web`

### 5. Ejecutar pruebas automatizadas
```bash
npm test -- --watchAll=false
```

### 6. Estructura relevante
- `app/` código de pantallas usando Expo Router.
- `src/application` estado global y store Redux.
- `src/domain` modelos, servicios e indicadores.
- `src/data` repositorios y clientes HTTP.
- `docs/` documentación técnica y manuales.
