import styled from 'styled-components';
import { Colors } from '../../../../../utils/enums/colors';

export const DetailsWrapper = styled.div`
  background: ${Colors.WHITE};
  box-shadow: 0 2px 6px #0000001a;
  border-radius: 10px;
  margin: 0 auto 40px;
`;

export const CampaignForm = styled.form``;

export const CampaignFormHeader = styled.div`
  padding: 16px 30px;
  display: flex;
  border-bottom: 1px solid rgba(217, 216, 232, 0.5);
  align-items: center;
  justify-content: space-between;

  p {
    font-size: 18px;
    font-weight: 500;
    color: #33334f;
    margin: 0;
  }
`;

export const CampaignFormHeaderButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  button {
    &:first-child {
      margin-right: 20px;
    }
  }
`;

export const CampaignFormGroup = styled.div`
  margin-bottom: 32px;
`;

export const CampaignFormGroupCols = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 32px;

  > * {
    flex: 0 0 100%;
  }
`;

export const CampaignFormGroupTwoCols = styled(CampaignFormGroupCols)`
  > * {
    flex: 0 0 49%;
    margin-top: 0;
  }
`;

export const CampaignFormGroupThreeCols = styled(CampaignFormGroupCols)`
  > * {
    flex: 0 0 32%;
    margin: 0;
  }
`;

export const CampaignFormContainer = styled.div`
  padding: 30px;
`;

export const Divider = styled.div`
  background: ${Colors.DIVIDER_GREY};
  width: 100%;
  height: 1px;
  margin-bottom: 32px;
`;

export const AsssetsWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-self: flex-end;
`;

export const DetailsMoreInfoWrapper = styled.div`
  background: rgba(54, 84, 255, 0.1);
  padding: 30px;
  border-radius: 0 0 10px 10px;

  > h4 {
    color: ${Colors.PRIMARY_1};
    font-size: 16px;
    line-height: 20px;
    font-weight: 500;
    margin-bottom: 4px;
    margin: 0;
  }

  > p {
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    color: ${Colors.BLACK_70};
    margin: 0 auto 16px;
  }
`;

export const KeywordChip = styled.span`
  background: #f4f6f8;
  border-radius: 100px;
  font-size: 13px;
  line-height: 15px;
  color: ${Colors.BLACK_70};
  padding: 4px 10px;
  margin-right: 10px;
`;
