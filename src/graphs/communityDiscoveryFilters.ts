import request from 'graphql-request';
import { getCookieByName } from '../utils/helpers/cookies';

const communityDiscoveryFiltersResponse = `
__typename
  businessCategories
countries
maxMemberCount
maxPostsEngagementRateLastNinetyDays`;

export type CommunityDiscoveryFiltersResponse = {
  businessCategories: Array<string | null> | null;
  countries: Array<string | null> | null;
  maxMemberCount: number | null;
  maxPostsEngagementRateLastNinetyDays: number | null;
  maxCampaignPostEngagementRateLastNinetyDays: number | null;
};

export const communityDiscoveryFilters =
  async (): Promise<CommunityDiscoveryFiltersResponse> => {
    const statement = `query communityDiscoveryFilters {
        communityDiscoveryFilters{
            ${communityDiscoveryFiltersResponse}
        }
    }`;
    const gqlAPIServiceArguments: any = {};
    const userToken = getCookieByName('token') as string;
    const result = await request({
      url: 'https://graph.develop.convosight.com/graphql',
      document: statement,
      variables: gqlAPIServiceArguments,
      requestHeaders: {
        authorization: userToken,
      },
    });

    return <CommunityDiscoveryFiltersResponse>result.communityDiscoveryFilters;
  };
