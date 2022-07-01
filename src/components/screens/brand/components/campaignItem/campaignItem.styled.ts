import styled from 'styled-components';
import { Colors } from '../../../../../utils/enums/colors';

export const CampaignRow = styled.li`
  margin-top: 14px;
  background: #fff;
  box-shadow: 0 2px 6px #0000001a;
  border-radius: 10px;
  list-style-type: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
`;

export const CampaignContent = styled.div`
  p {
    color: ${Colors.BLACK_70};
    font-size: 13px;
    margin: 0;
  }
`;

export const CampaignContentTop = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  h5 {
    color: ${Colors.PRIMARY_1};
    font-size: 16px;
    margin: 0 10px;
    font-weight: 500;
  }
`;
