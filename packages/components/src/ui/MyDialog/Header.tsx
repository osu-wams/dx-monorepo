import styled from 'styled-components/macro';
import { breakpoints } from 'src/theme';

export default styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.ui.myDialog.header.border};
  > div {
    display: flex;
    flex-direction: row;
    padding-top: 1rem;
  }

  @media (min-width: ${breakpoints.small}) {
    padding-top: 0;
  }
`;
