import React from 'react';
import { RecoilRoot } from 'recoil';
import { GlobalStyles } from '../theme';
import { light } from '../theme/themes';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components/macro';
import { spacing } from '../theme';
import { Story } from '@storybook/react/types-6-0';

export const withTheme = (StoryComponent: Story) => (
  <ThemeProvider theme={light}>
    <GlobalStyles />
    <RecoilRoot>
      <StoryComponent />
    </RecoilRoot>
  </ThemeProvider>
);

const Container = styled.div`
  width: 50%;
  padding: ${spacing.default};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const paddedContainer = (StoryComponent: Story) => (
  <Container>
    <StoryComponent />
  </Container>
);
