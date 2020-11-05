import styled from 'styled-components/macro';
import { borderRadius, breakpoints } from 'src/theme';

export default styled.img`
  max-width: 100%;
  min-width: 100%;
  @media (min-width: ${breakpoints.small}) {
    border-radius: ${borderRadius[16]} ${borderRadius[16]} 0 0;
  }
`;
