import { requestApi } from './request';
import { gql } from 'graphql-request';

export type BrandCommunity = {
	groupId: string;
	brandId: string;
	groupName: string;
	totalMembers: any;
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
export type UpdateBrandCommunityReport = {
    groupId: string;
	brandId: string;
	groupName?: string;
	totalMembers?: number;
	lastUpdatedOn?: string;
	targets?: string;
	groupCreatedAtUTC?: string;
	keywordCategories?: [string];
	keywordBrand?: string;
	lastUpdatedAt?: string;
	MAUValues?: string;
	DAUValues?: string;
	impressions?: string;
	surveys?: string;
	MAUValuesPercentage?: string;
	DAUValuesPercentage?: string;
	privacy?: string;
	supportingText?: string;
}

const statement = gql`mutation updateBrandCommunityReport($input: UpdateBrandCommunityReport!) {
    updateBrandCommunityReport(input: $input) {
groupId
brandId
groupName
totalMembers
lastUpdatedOn
targets
groupCreatedAtUTC
createdAtUTC
updatedAtUTC
    }
  }`

export const updateBrandCommunityReport = async(
    input:UpdateBrandCommunityReport
):Promise<BrandCommunity>=>{
    const gqlAPIConversation:{input:any} = { input }
    const { updateBrandCommunityReport } = await requestApi<
    typeof gqlAPIConversation,
    { updateBrandCommunityReport :BrandCommunity}
    >(statement,gqlAPIConversation)
    return updateBrandCommunityReport;
}