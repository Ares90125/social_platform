import { gql } from 'graphql-request';
import { requestApi } from './request';

export type CreateCMCCampaignGroupsInput = {
  campaignId: string | null;
  groupId: string | null;
  fbGroupId: string | null;
  memberCount: number | null;
  campaignPostEngagementRateLastNinetyDays: number | null;
  postsEngagementRateLastNinetyDays: number | null;
  groupName: string | null;
  state: string | null;
  groupInstallationStartedAtUTC: Date | string | null;
  businessCategory: string | null;
  topTenCities: string | null;
  categoryDensity: string | null;
  location: string | null;
  communityAdminId: string | null;
  averageTopPostsReach: string | null;
  metadata: string | null;
  defaultTaskDate: string | null;
  timezone: string | null;
};

export type CMCampaignGroups = {
  __typename: 'CMCampaignGroups';
  campaignId: string;
  groupId: string;
  fbGroupId: string;
  id: string;
  createdAtUTC: string;
  updatedAtUTC: string;
  memberCount: string;
  engagementRate: string | null;
  activityRate: string | null;
  categoryConversationCount: number | null;
  topTenCities: string | null;
  categoryDensity: string | null;
  location: string | null;
  groupTaskStatus: string | null;
  campaignGroupTaskId: string | null;
};

const createCMCampaignGroupsReturnAttributes = `
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
`;

const statement = gql`mutation createCMCampaignGroups($input: [CreateCampaignGroupInput!]!) {
  createCMCampaignGroups(input: $input) {
    ${createCMCampaignGroupsReturnAttributes}
  }
}`;

export const createCMCampaignGroups = async (
  input: CreateCMCCampaignGroupsInput[],
): Promise<CMCampaignGroups[]> => {
  const result = await requestApi<
    { input: CreateCMCCampaignGroupsInput[] },
    { createCMCampaignGroups: CMCampaignGroups[] }
  >(statement, { input });
  return result.createCMCampaignGroups;
};
