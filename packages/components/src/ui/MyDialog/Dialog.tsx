import { Dialog } from '@reach/dialog';
import styled from 'styled-components/macro';
import { borderRadius, fontSize, spacing, breakpoints } from 'src/theme';

export interface DialogProps {
  padding?: string;
}

export default styled(Dialog)<DialogProps>`
  background: ${({ theme }) => theme.ui.myDialog.background};
  border-radius: ${borderRadius[16]};
  border: ${({ theme }) => theme.ui.myDialog.border};
  .closeButton {
    float: right;
    margin-right: -1.5rem;
    font-size: ${fontSize[26]};
  }
  h2 {
    color: ${({ color, theme }) => color || theme.ui.myDialog.h2.color};
    font-size: ${fontSize[24]};
    font-weight: 500;
    margin-bottom: 0;
    margin-top: ${spacing.small};
  }
  h3 {
    font-size: ${fontSize[16]};
    color: ${({ theme }) => theme.ui.myDialog.h3.color};
    margin-bottom: ${spacing.small};
  }
  .details {
    color: ${({ theme }) => theme.ui.myDialog.details.color};
    font-size: ${fontSize[14]};
    margin-top: -1rem;
    margin-bottom: 2rem;
  }
  &[data-reach-dialog-content] {
    ${props => (props.padding === 'false' ? 'padding: 0 0 1.5rem 0;' : '')}
  }
  @media screen and (max-width: ${breakpoints.small}) {
    hr {
      margin: 0;
    }
    &[data-reach-dialog-content] {
      width: 100%;
      margin: 0;
      ${props => (props.padding === 'false' ? 'padding: 0 0 1.5rem 0;' : '')}
      border-radius: 0;
    }
  }
  @media (min-width: ${breakpoints.small}) {
    &[data-reach-dialog-content] {
      width: 60vw;
      max-width: ${breakpoints.small};
    }
  }
`;
