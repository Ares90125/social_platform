import { gql } from 'graphql-request';
import {
  CampaignDataToSend,
  CampaignDataToUpdate,
  CampaignInputs,
  UpdateCampaignInput,
  UpdateCampaignProposalsInput,
} from '../components/screens/campaign/components/detailsTab/campaign.types';
import { requestApi } from './request';

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
  assetsVideoRequired
`;

const statement = gql`mutation UpdateCMCampaignDetails($input: UpdateCMCampaignInput!) {
  updateCMCampaignDetails(input: $input) {
      ${campaignsReturnAttributes}
  }
}`;

export const updateCampaign = async (
  input: UpdateCampaignInput,
): Promise<CampaignInputs> => {
  const gqlAPIServiceArguments = { input };
  const { updateCMCampaignDetails } = await requestApi<
    typeof gqlAPIServiceArguments,
    { updateCMCampaignDetails: CampaignInputs }
  >(statement, gqlAPIServiceArguments);

  return updateCMCampaignDetails;
};

export const updateCampaignProposals = async (
  input: UpdateCampaignProposalsInput,
): Promise<CampaignDataToSend> => {
  const gqlAPIServiceArguments = { input };
  const { createCMCampaign } = await requestApi<
    typeof gqlAPIServiceArguments,
    { createCMCampaign: CampaignDataToSend }
  >(statement, gqlAPIServiceArguments);

  return createCMCampaign;
};
