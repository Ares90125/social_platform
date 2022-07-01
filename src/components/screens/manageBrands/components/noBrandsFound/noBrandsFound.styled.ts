import styled from 'styled-components';
import { Colors } from '../../../../../utils/enums/colors';

export const NoBrandsFoundWrapper = styled.div`
  position: absolute;
  top: 60%;
  transform: translate(-50%, -50%);
  left: 50%;
  text-align: center;

  h3 {
    font-weight: 500;
    font-size: 24px;
    margin: 0 0 8px;
  }

  h4 {
    font-size: 16px;
    font-weight: 400;
    color: ${Colors.BLACK_70};
    margin: 0 0 24px;
  }

  figure {
    margin: 0 auto 12px;
  }
`;
