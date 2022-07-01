import styled from 'styled-components';
import { Colors } from '../../../../../utils/enums/colors';
import { Button } from '../../../../form';

export const ContentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  max-width: 1140px;
  margin: 0 auto;
  padding: 40px 15px 0;

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

export const CreateCampaignButton = styled(Button)`
  background: #00c389;
  padding: 10px 14px;

  &:hover {
    background: #00b47e;
  }
`;
