import { requestApi } from './request';
import { gql } from 'graphql-request';
import { IUpdatedResultSection } from '../components/screens/campaign/components/reportingTab/components/KPIResult';

export type CMCReportMetricsV2 =  {
	__typename: 'CmcReportMetrics';
	numGroups: number;
	numAudience: number;
	numDuringBrandMentions: number;
	numAfterBrandMentions: number;
	numBeforeBrandMentions: number;
	numLeadsGenerated: number;
	numDuringCatConversations: number;
	numDuringBrandConversations: number;
	numBeforeBrandConversations: number;
	numBeforeCatConversations: number;
	numAfterCatConversations: number;
	numAfterBrandConversations: number;
	campaignId: string;
	numPosts: number;
	numAdminPosts: number;
	numUGCPosts: number;
	numReactionAdminPost: number;
	numReactionUGCPost: number;
	numCommentAdminPost: number;
	numCommentUGCPost: number;
	totalCampaignPost: number;
	numCompletedCampaignPost: number;
	phaseMetrics: string;
	beforeSOV: string;
	afterSOV: string;
	duringSOV: string;
	duringSentimentMap: string;
	beforeSentimentMap: string;
	afterSentimentMap: string;
	campaignHighlights: Array<string | null>;
	engagementInsights?: string;
	duringSOVNonHashTag?: string;
    results: IUpdatedResultSection;
}

const statement = gql`query GetCMCReportMetricsV2($campaignId: String!) {
    getCMCReportMetricsV2(campaignId: $campaignId) {
    __typename
    numGroups
    numAudience
    numDuringBrandMentions
    numAfterBrandMentions
    numBeforeBrandMentions
    numLeadsGenerated
    numDuringCatConversations
    numDuringBrandConversations
    numBeforeBrandConversations
    numBeforeCatConversations
    numAfterCatConversations
    numAfterBrandConversations
    campaignId
    numPosts
    numAdminPosts
    numUGCPosts
    numReactionAdminPost
    numReactionUGCPost
    numCommentAdminPost
    numCommentUGCPost
    totalCampaignPost
    numCompletedCampaignPost
    phaseMetrics
    beforeSOV
    afterSOV
    duringSOV
    duringSentimentMap
    beforeSentimentMap
    afterSentimentMap
    campaignHighlights
    engagementInsights
    duringSOVNonHashTag
    }
}`

export const getCMCReportMetricsV2 = async(
    campaignId:string
):Promise<CMCReportMetricsV2> =>{
    const gqlAPIConversation:{campaignId:string} = {campaignId}
    const {getCMCReportMetricsV2} = await requestApi<
        typeof gqlAPIConversation,
        {getCMCReportMetricsV2:CMCReportMetricsV2}
    >(statement,gqlAPIConversation)
    return getCMCReportMetricsV2;
}