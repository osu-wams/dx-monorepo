import React from 'react';
import { RecoilRoot } from 'recoil';
import { GlobalStyles } from '../src/theme';
import { light } from '../src/theme/themes';
import { ThemeProvider } from 'styled-components';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
  Story => (
    <ThemeProvider theme={light}>
      <GlobalStyles />
      <RecoilRoot>
        <Story />
      </RecoilRoot>
    </ThemeProvider>
  ),
];
