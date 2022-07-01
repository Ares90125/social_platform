import request, { gql } from 'graphql-request';
import { getCookieByName } from '../utils/helpers/cookies';

export type CommunityDiscoveryInput = Partial<{
  ageRange: string[];
  gender: string[];
  memberMatchingCriteria: string;
  memberMatchingRange: string;
  category: string[];
  sortBy: string;
  state: string[];
  descendingOrder: boolean;
  groupQualification: string;
  businessCategory: string[];
  country: string[];
  monetizationState: string[];
  privacy: string[];
  owner: string[];
  region: string[];
  memberCount: string;
  postsEngagementRateLastNinetyDays: string;
  fbGroupId: string;
  communityIds: string[];
  cmcTrained: boolean;
  groupProfile: boolean;
  performanceTrained: boolean;
  minRating: string;
  maxRating: string;
  searchTerm: string;
}>;

export type Community = {
  audienceMatch: string | null;
  averageActiveMember: string | null;
  averageTopPostsReach: string | null;
  businessCategory: string | null;
  campaignPostEngagementRateLastNinetyDays: number | null;
  categoryDensity: string | null;
  country: string | null;
  defaultCommunityAdmin: string | null;
  fbGroupId: string | null;
  groupId: string | null;
  groupInstallationStartedAtUTC: Date | string | null;
  isAnyCampaignTaskToBePerformedThisMonth: boolean;
  isMonetizable: boolean;
  isMonetized: boolean;
  memberCount: number | null;
  name: string | null;
  postsEngagementRateLastNinetyDays: number | null;
  privacy: string | null;
  state: string | null;
  topTenCities: string | null;
  CmcTrained: string | null;
  performanceTrained: string | null;
  groupProfile: string | null;
  CmcRatingTotal: string | null;
  CmcRatingCount: string | null;
  CmcRatingAvg: string | null;
};

export type CommunityDiscoveryApiType = {
  eligibleCommunitiesCount: number | null;
  monetizableGroupsHavingCampaignTaskToPerformThisMonth: number | null;
  nonMonetizableGroupsHavingCampaignTaskToPerformThisMonth: number | null;
  selectedCommunities: Community[];
  totalMonetizableGroups: number | null;
};

const communityDiscoveryAPIAttributes = `
  groupId
  name
  categoryDensity
  campaignPostEngagementRateLastNinetyDays
  postsEngagementRateLastNinetyDays
  country
  state
  businessCategory
  memberCount
  isMonetized
  isMonetizable
  privacy
  fbGroupId
  groupInstallationStartedAtUTC
  topTenCities
  isAnyCampaignTaskToBePerformedThisMonth
  defaultCommunityAdmin
  audienceMatch
  averageActiveMember
  averageTopPostsReach
`;

export const communityDiscoveryAPI = async (
  input: CommunityDiscoveryInput,
): Promise<CommunityDiscoveryApiType> => {
  const statement = gql`query CommunityDiscoveryAPI($input: communityDiscoveryInput!) {
    communityDiscoveryAPI(input: $input) {
    __typename
    eligibleCommunitiesCount
    monetizableGroupsHavingCampaignTaskToPerformThisMonth
    nonMonetizableGroupsHavingCampaignTaskToPerformThisMonth
    totalMonetizableGroups
    selectedCommunities {
      ${communityDiscoveryAPIAttributes}}
    }
  }`;
  const gqlAPIServiceArguments: { input: CommunityDiscoveryInput } = { input };
  const userToken = getCookieByName('token') as string;
  const result = await request({
    url: 'https://graph.develop.convosight.com/graphql',
    document: statement,
    variables: gqlAPIServiceArguments,
    requestHeaders: {
      authorization: userToken,
    },
  });

  return <CommunityDiscoveryApiType>result.communityDiscoveryAPI;
};
