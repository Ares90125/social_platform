import { gql } from 'graphql-request';
import { requestApi } from './request';

export type UpdateCampaignGroupInput = {
  campaignId: string;
  groupId: string;
  communityAdminId?: string | null;
  communityManagerId?: string | null;
  pricing?: string | null;
  cohort?: string | null;
  currency?: string | null;
  timezone?: string | null;
  paymentAmountPaid?: string | null;
  paymentRemarks?: string | null;
  paymentStatus?: string | null;
  paymentDate?: string | null;
  defaultTaskDate?: string | null;
  modeOfCommunication?: string | null;
};

export type UpdateCampaignGroupResponse = {
  campaignId: string;
  groupId: string;
};

const statement = gql`
  mutation updateCMCampaignGroups($input: [UpdateCampaignGroupInput!]!) {
    updateCMCampaignGroups(input: $input) {
      campaignId
      groupId
    }
  }
`;

export const updateCMCampaignGroups = async (
  input: UpdateCampaignGroupInput[],
): Promise<UpdateCampaignGroupResponse[]> => {
  const result = await requestApi<
    { input: UpdateCampaignGroupInput[] },
    { updateCMCampaignGroups: UpdateCampaignGroupResponse[] }
  >(statement, { input });

  return result.updateCMCampaignGroups;
};
