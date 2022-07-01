import styled from 'styled-components';
import { Colors } from '../../../../../utils/enums/colors';

export const NoSelectedCampaignsWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  h3 {
    color: ${Colors.PRIMARY_1};
    font-size: 24px;
    line-height: 32px;
    margin: 12px auto 8px;
  }

  p {
    color: ${Colors.BLACK_70};
    font-size: 16px;
    line-height: 22px;
    margin: 0 auto 8px;
  }
`;
