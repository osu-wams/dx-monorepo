import styled from 'styled-components/macro';
import { spacing, fontSize } from '../theme';

export interface LeadTextProps {
  secondary?: boolean;
}

// Can be use as a header with <LeadText as="h1/h2/h3">
export default styled.div<LeadTextProps>`
  line-height: ${fontSize[14]};
  padding: 0 ${spacing.default} 0 0;
  color: ${({ secondary, theme }) =>
    secondary ? theme.ui.text.lead.color.secondary : theme.ui.text.lead.color.primary};
`;
