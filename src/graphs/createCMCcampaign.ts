import { gql } from 'graphql-request';
import {
  CampaignDataToSend,
  CampaignDataToSendSimple,
} from '../components/screens/campaign/components/detailsTab/campaign.types';
import { CampaignStatusEnum } from '../utils/enums/campaignStatus';
import { CampaignTypeEnum } from '../utils/enums/campaignType';
import { requestApi } from './request';

export type ICampaignModelProperty = {
  cmcReportName: string;
  details: string;
  typeformId?: any;
  startDate: Date;
  endDate: Date;
  primaryObjective: string;
  secondaryObjective?: string;
  keywordCategory?: string;
  keywordBrand?: string;
  keywordSubCategories: string[];
  taskTitle?: any;
  campaignPeriod?: any;
  phaseIdea?: string;
  totalPhase?: any;
  currentPhase?: any;
  defaultPostContentType: string;
  communicationChannel?: 'WhatsApp' | 'Email' | null;
  KPIs: string;
  cmcType: string;
  keywords?: string[];
  keywordsExcluded?: string[];
  publishTime: string;
  endDateAtUTC: Date;
  startDateAtUTC: Date;
  timezoneOffMins: number;
  timezoneName: string;
  currency?: 'INR' | 'USD' | 'SGD';
  assetsTextRequired?: boolean;
  assetsImagesRequired?: number;
  assetsVideoRequired?: boolean;
};

export type CreateCampaignInput = {
  brandId: string;
  brandName: string;
  brandLogoURL: string;
  campaignName: string;
  details?: string | null;
  startDateAtUTC?: string | null;
  endDateAtUTC?: string | null;
  status?: CampaignStatusEnum | null;
  type?: CampaignTypeEnum | null;
  proposalEmails: Array<string | null>;
  objective?: string | null;
  keywords?: Array<string | null> | null;
  keywordBrand?: string | null;
  keywordCategory?: string | null;
  campaignSummary?: string | null;
  cmcReportName?: string | null;
  keywordSubCategories?: Array<string | null> | null;
  taskTitle: string | null;
  campaignPeriod: string | null;
  defaultTaskDate: string | null;
  KPIs: Array<string | null> | null;
  primaryObjective: string | null;
  secondaryObjective: string | null;
  cmcType: string | null | string[];
  timezoneName: string | null;
  s3CoverImageUrl: string | null;
  cmcReportVersion: number | null;
  defaultPostContentType: string | null;
  typeformId: string | null;
  phaseIdea: string;
  currentPhase?: string;
  totalPhase?: string;
  currency?: ICampaignModelProperty['currency'];
  communicationChannel?: ICampaignModelProperty['communicationChannel'];
  keywordsExcluded?: string[];
  productPurchaseInfo: string | null;
  productPurchaseRequired: boolean | null;
  trainingLinkMessage: string | null;
};

export type Campaign = {
  __typename: 'Campaign';
  brandid: string;
  campaignName: string;
  numConversationsListenedInLastThreeMonths: string | null;
  campaignId: string | null;
  startDateAtUTC: string | null;
  endDateAtUTC: string | null;
  createdAtUTC: string | null;
  updatedAtUTC: string | null;
  status: CampaignStatusEnum | null;
  type: CampaignTypeEnum | null;
  details: string | null;
  brief: string | null;
  objective: string | null;
  keywords: Array<string | null> | null;
  proposalEmails: Array<string | null> | null;
  brandName: string | null;
  keywordBrand: string | null;
  keywordCategory: string | null;
  keywordSubCategories?: Array<string | null> | null;
  campaignSummary: string | null;
  cmcReportName: string | null;
  groupIds: Array<string | null> | null;
  s3ReportUrl?: string | null;
  campaignPeriod: string | null;
  taskTitle: string | null;
  defaultTaskDate: string | null;
  KPIs: Array<string | null> | null;
  primaryObjective: string | null;
  secondaryObjective: string | null;
  cmcType: Array<string | null> | null;
  timezoneName: string | null;
  s3CoverImageUrl: string | null;
  cmcReportVersion: string | null;
  defaultPostContentType: string | null;
  typeformId: string | null;
  productPurchaseInfo: string | null;
  productPurchaseRequired: boolean | null;
  trainingLinkMessage: string | null;
};

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

const statement = gql`mutation CreateCMCampaign($input: CreateCMCampaignInput!) {
  createCMCampaign(input: $input) {
      ${campaignsReturnAttributes}
  }
}`;

export const createCampaign = async (
  input: CampaignDataToSend,
): Promise<CampaignDataToSend> => {
  const { createCMCampaign } = await requestApi<
    { input: CampaignDataToSend },
    { createCMCampaign: CampaignDataToSend }
  >(statement, { input });

  return createCMCampaign;
};

export const createCampaignSimple = async (
  input: CampaignDataToSendSimple,
): Promise<CampaignDataToSend> => {
  const { createCMCampaign } = await requestApi<
    { input: CampaignDataToSendSimple },
    { createCMCampaign: CampaignDataToSend }
  >(statement, { input });

  return createCMCampaign;
};
