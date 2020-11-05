import React from 'react';
import styled from 'styled-components/macro';
import { borderRadius, fontSize, spacing } from 'src/theme';

type IBtnSizes = 'small' | 'normal' | 'large';

type BtnProps = {
  bg?: string;
  fg?: string;
  btnSize?: IBtnSizes;
};

const btnVariants: { [key: string]: { padding: string; fontSize?: string } } = {
  normal: {
    padding: '.6rem 1.4rem',
  },
  small: {
    padding: '.2rem .3rem',
    fontSize: fontSize[14],
  },
  large: {
    padding: '1rem 1.8rem',
    fontSize: fontSize[18],
  },
};

export default styled.button<BtnProps & React.HTMLProps<HTMLButtonElement>>(
  ({ theme, fg, bg }) => ({
    backgroundColor: bg ?? theme.ui.button.background,
    color: fg ?? theme.ui.button.color,
    border: 'none',
    borderRadius: borderRadius[4],
    cursor: 'pointer',
    '& + &': {
      marginLeft: spacing.medium,
    },
    '&:disabled': {
      cursor: 'not-allowed',
    },
  }),
  ({ btnSize = 'normal' }) => btnVariants[btnSize],
);
