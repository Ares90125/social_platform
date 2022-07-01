import { gql } from 'graphql-request';
import { requestApi } from './request';
import { CampaignStatusEnum } from '../utils/enums/campaignStatus';
import { CampaignDataToSend } from '../components/screens/campaign/components/detailsTab/campaign.types';

const statement = gql`
  mutation MarkCampaignStatus(
    $brandId: String!
    $campaignId: String!
    $status: CampaignStatusEnum
  ) {
    markCampaignStatus(
      brandId: $brandId
      campaignId: $campaignId
      status: $status
    ) {
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
      phaseIdea
      currentPhase
      totalPhase
      currency
      communicationChannel
      keywordsExcluded
      keyFindings
      brandObjective
      phaseIdeaSupportingText
      keyFindingsSupportingText
      resultsSupportingText
      kpiSupportingText
      brandShareOfVoiceSupportingText
      brandSentimentSupportingText
      wordCloudSupportingText
      engagementInsightSupportingText
      topPerformingPostSupportingText
      engagementInsights
      productPurchaseInfo
      productPurchaseRequired
      trainingLinkMessage
      assetsTextRequired
      assetsImagesRequired
      assetsVideoRequired
    }
  }
`;

export type MarkCampaignStatus = {
  brandId: string;
  campaignId: string;
  status: CampaignStatusEnum;
};

export const markCampaignStatus = async (
  input: MarkCampaignStatus,
): Promise<CampaignDataToSend> => {
  const response = await requestApi<
    MarkCampaignStatus,
    { markCampaignStatus: CampaignDataToSend }
  >(statement, input);

  return response.markCampaignStatus;
};
