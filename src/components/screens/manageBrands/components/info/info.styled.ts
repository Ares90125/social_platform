import styled from 'styled-components';
import { Colors } from '../../../../../utils/enums/colors';

export const InfoWrapper = styled.div`
  h1 {
    align-items: center;
    display: flex;
    font-size: 24px;
    color: ${Colors.PRIMARY_1};
    margin: 0 0 8px;
    line-height: 1;
  }

  p {
    color: ${Colors.PRIMARY_1};
    opacity: 0.8;
    font-size: 14px;
    margin: 0;
  }
`;
