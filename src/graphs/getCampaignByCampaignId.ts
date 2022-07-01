import request, { gql } from 'graphql-request';
import { CampaignInputs } from '../components/screens/campaign/components/detailsTab/campaign.types';
import { getCookieByName } from '../utils/helpers/cookies';

const campaignsReturnAttributes = `
            brandId
            campaignName
            campaignId
            numConversationsListenedInLastThreeMonths
            startDateAtUTC
            endDateAtUTC
            createdAtUTC
            updatedAtUTC
            status
            type
            details
            objective
            keywords
            proposalEmails
            brandName
            keywordBrand
            keywordCategory
            keywordSubCategories
            groupIds
            campaignSummary
            cmcReportName
            s3ReportUrl
            campaignPeriod
            taskTitle
            defaultTaskDate
            KPIs
            primaryObjective
            secondaryObjective
            cmcType
            timezoneName
            powerBIDashboardUrl
            s3CoverImageUrl
            cmcReportVersion
            defaultPostContentType
            typeformId
            useWAForContentAutomation
          phaseIdea currentPhase totalPhase currency communicationChannel keywordsExcluded keyFindings brandObjective phaseIdeaSupportingText keyFindingsSupportingText resultsSupportingText kpiSupportingText brandShareOfVoiceSupportingText brandSentimentSupportingText wordCloudSupportingText engagementInsightSupportingText topPerformingPostSupportingText
            engagementInsights
            productPurchaseInfo
            productPurchaseRequired
            trainingLinkMessage
            assetsTextRequired
            assetsImagesRequired
            assetsVideoRequired`;

export const getCampaignByCampaignId = async (
  campaignId: string,
): Promise<CampaignInputs> => {
  const query = gql`query GetCampaignByCampaignId($campaignId: String!) {
        getCampaignByCampaignId(campaignId: $campaignId) {
          ${campaignsReturnAttributes}
        }
      }`;

  const gqlAPIServiceArguments: Partial<{
    campaignId: string;
  }> = {
    campaignId,
  };
  const token = getCookieByName('token') as string;
  const result = await request({
    url: 'https://graph.develop.convosight.com/graphql',
    document: query,
    variables: gqlAPIServiceArguments,
    requestHeaders: {
      authorization: token,
    },
  });
  const normalizedCampaign: CampaignInputs = {
    ...result.getCampaignByCampaignId,
    KPIs: JSON.parse(result.getCampaignByCampaignId.KPIs),
    cmcType: JSON.parse(result.getCampaignByCampaignId.cmcType),
  };

  return normalizedCampaign;
};
