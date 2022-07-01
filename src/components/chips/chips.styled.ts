import styled from 'styled-components';
import { ChipsProps } from './chips.types';
import { Colors } from '../../utils/enums/colors';

export const ChipsWrapper = styled.div<ChipsProps>`
  background: rgba(51, 51, 79, 0.06);
  color: ${Colors.PRIMARY_1};
  font-weight: 600;
  font-size: 12px;
  padding: 0 12px;
  line-height: 17px;
  border-radius: 50px;
  margin-left: 5px;
  text-align: center;
`;

export const CampaignChip = styled(ChipsWrapper)`
  min-width: 70px;
  font-weight: 500;
  height: 20px;
  line-height: 20px;
`;

export const CampaignChipDraft = styled(CampaignChip)`
  color: #0065ff;
  background: rgba(0, 101, 255, 0.1);
`;

export const CampaignChipPending = styled(CampaignChip)`
  color: #ff7d37;
  background: rgba(253, 148, 51, 0.1);
`;

export const CampaignChipCompleted = styled(CampaignChip)`
  color: #164d3f;
  background: rgba(22, 77, 63, 0.1);
`;

export const CampaignChipActive = styled(CampaignChip)`
  background: rgba(18, 196, 87, 0.2);
  color: #00b47e;
`;

export const CampaignChipScheduled = styled(CampaignChip)`
  color: #4f3a77;
  background: rgba(79, 58, 119, 0.1);
`;
