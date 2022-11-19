//Arquivo para definições do typescript
import 'styled-components'
import { defaultTheme } from '../styles/Theme/default'

type ThemeType = typeof defaultTheme;

declare module 'styled-components'{
    export interface DefaultTheme extends ThemeType{}
}