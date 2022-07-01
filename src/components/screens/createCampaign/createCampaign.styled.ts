import styled from 'styled-components';
import { Colors } from '../../../utils/enums/colors';

export const AddNewCampaignWrapper = styled.div`
  margin: 50px auto 0;
  background: ${Colors.BG_GREY};
  height: calc(100vh - 50px);
  position: relative;
  overflow: auto;
`;

export const AddNewCampaign = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  a {
    font-size: 13px;
    color: #0000006e;
    font-weight: 500;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      margin-left: 3px;
    }
  }

  h1 {
    margin: 25px 0 15px;
    color: ${Colors.PRIMARY_1};
    font-size: 32px;
    font-weight: 700;
  }

  h6 {
    color: ${Colors.PRIMARY_1};
    opacity: 0.89;
    font-size: 15px;
    margin-bottom: 30px;
    font-weight: normal;
    margin: 0;
  }
`;
