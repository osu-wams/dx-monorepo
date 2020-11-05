import styled from 'styled-components/macro';
import { Button } from 'src/ui/Button';

export default styled(Button).attrs({ as: 'a' })`
  text-decoration: none;
`;
