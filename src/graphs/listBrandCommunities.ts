import { requestApi } from './request';
import { gql } from 'graphql-request';

export type BrandCommunityConnection = {
    items: [BrandCommunity];
    nextToken: string;
}
export type BrandCommunity = {
    groupId: string;
    brandId: string;
    groupName: string;
    totalMembers: number;
    lastUpdatedOn: string;
    targets: string;
    groupCreatedAtUTC: string;
    createdAtUTC: string;
    updatedAtUTC: string;
    brandCommunityReports3Key: string;
    DAUValues: string;
    impressions: string;
    MAUValues: string;
    coverImageUrl: string;
    privacy: string;
    supportingText: string;
}

const statement = gql`query listBrandCommunityReports($brandId: String!) {
    listBrandCommunityReports(brandId: $brandId) {
items {
groupId
brandId
groupName
totalMembers
lastUpdatedOn
targets
groupCreatedAtUTC
createdAtUTC
updatedAtUTC
brandCommunityReports3Key
DAUValues
impressions
MAUValues
coverImageUrl
privacy
supportingText
},
nextToken
}
  }`;

export const listBrandCommunities = async (
    brandId: string, limit: any = null, nextToken: any = null
): Promise<BrandCommunityConnection> => {
    const gqlAPIConversation: { brandId: string, limit: any, nextToken: string } = { brandId, limit, nextToken }
    const { listBrandCommunityReports } = await requestApi<
        typeof gqlAPIConversation,
        { listBrandCommunityReports: BrandCommunityConnection }
    >(statement, gqlAPIConversation);
    return listBrandCommunityReports;
}