import { gql } from 'graphql-request';
import { CMCampaignGroups } from './createCMCampaignGroups';
import { requestApi } from './request';

export type UpdateCMCampaignGroupInput = {
  campaignId: string;
  groupId: string;
  groupTaskStatus: string;
};

const statement = gql`
  mutation updateCMCampaignGroup($input: UpdateCampaignGroupInput!) {
    updateCMCampaignGroup(input: $input) {
      __typename
      campaignId
      groupId
      groupName
      id
      createdAtUTC
      updatedAtUTC
      memberCount
      memberEngagementRateUTC
      postEngagementRateUTC
      campaignPostEngagementRateLastNinetyDays
      postsEngagementRateLastNinetyDays
      weeklyConversationalVolume
      topTenCities
      categoryDensity
      location
      groupTaskStatus
      postType
      communityAdminId
      communityAdminName
      communityManagerId
      isPaymentInfoAvailable
    }
  }
`;

export const updateCMCampaignGroup = async (
  input: UpdateCMCampaignGroupInput,
): Promise<CMCampaignGroups> => {
  const result = await requestApi<
    { input: UpdateCMCampaignGroupInput },
    { updateCMCampaignGroup: CMCampaignGroups }
  >(statement, { input });
  return result.updateCMCampaignGroup;
};
