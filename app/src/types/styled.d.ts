import 'styled-components';

import type { TradeSenseTheme } from '@presentation/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends TradeSenseTheme {}
}
