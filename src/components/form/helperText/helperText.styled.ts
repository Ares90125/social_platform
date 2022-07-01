import styled from 'styled-components';
import { Colors } from '../../../utils/enums/colors';

export const HelperTextWrapper = styled.p<{ error?: boolean }>`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: ${({ error }): string =>
    error ? Colors.ERROR_TEXT : Colors.BLACK_70};
  margin: 8px 0;
`;
