import {
  shadows,
  gradients,
  breakpoints,
  spacing,
  fontSize,
  borderRadius,
  mq,
} from './theme-settings';
import { Color } from './theme-colors';
import type { MOSTheme } from './theme-interface';
import GlobalStyles from './GlobalStyles';
import { light, dark, themesLookup, defaultTheme } from './themes';

export {
  shadows,
  spacing,
  gradients,
  breakpoints,
  mq,
  GlobalStyles,
  fontSize,
  borderRadius,
  Color,
  light,
  dark,
  themesLookup,
  defaultTheme
};

export type { MOSTheme };
