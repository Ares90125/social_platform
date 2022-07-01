import { CampaignStatusEnum } from '../../../../../utils/enums/campaignStatus';
import { BrandSentitmentSection } from '../reportingTab/components/BrandSentiment';
import { BrandShareofVoiceDetails } from '../reportingTab/components/BrandSOV';
import { IEngagementInsightSection } from '../reportingTab/components/EngagementInsights';
import {
  IUpdatedKPISection,
  IUpdatedResultSection,
} from '../reportingTab/components/KPIResult';
import { IUpdatedPhaseIdeaValues } from '../reportingTab/components/PhaseIdea';
import { TopPerformingPostSection } from '../reportingTab/components/Screenshots';
import { IWordCloudSection } from '../reportingTab/components/WordCloud';

export type CampaignInputs = {
  createdAtUTC: string;
  updatedAtUTC: string;
  campaignId: string;
  campaignName: string;
  details: string;
  phaseIdea: string;
  typeformId: string;
  cmcType: string[];
  totalPhase?: string;
  currentPhase?: string | null;
  productPurchaseRequired: boolean;
  productPurchaseInfo?: string;
  trainingLinkMessage?: string;
  assetsTextRequired: boolean;
  assetsVideoRequired: boolean;
  assetsImagesRequired?: string;
  keyFindings: string;
  keyFindingsSupportingText: string;
  brandSentimentSupportingText: string;
  engagementInsightSupportingText: string;
  brandShareOfVoiceSupportingText: string;
  resultsSupportingText: string;
  kpiSupportingText: string;
  topPerformingPostSupportingText: string;
  keywordCategory: string;
  keywordSubCategories: string[];
  keywordBrand: string;
  primaryObjective: string;
  secondaryObjective?: string;
  KPIs: string[];
  taskTitle?: string;
  campaignPeriod?: string;
  defaultPostContentType?: string | null;
  timezoneName?: string;
  currency?: string;
  communicationChannel?: string | null;
  defaultTaskDate?: string | null;
  startDateAtUTC: string;
  endDateAtUTC: string;
  brandId: string;
  brandLogoURL: null | string;
  brandName: string;
  brandObjective: string;
  cmcReportVersion: number;
  proposalEmails: string[];
  status: CampaignStatusEnum;
  keywords?: string[];
  keywordsExcluded?: string[];
  engagementInsights: string[];
  campaignSummary?: string;
  cmcReportName?: string;
  numConversationsListenedInLastThreeMonths: string | null;
  type: string;
  useWAForContentAutomation: string | null;
  wordCloudSupportingText: string;
  s3ReportUrl: string | null;
  s3CoverImageUrl: string | null;
  campaignBriefForCommunityAdmin: string | null;
};

export type CampaignDataResponse = Omit<CampaignInputs, 'cmcType' | 'KPIs'> & {
  KPIs: string;
  cmcType: string;
};

type NotNeeded =
  | 'cmcType'
  | 'KPIs'
  | 'createdAtUTC'
  | 'numConversationsListenedInLastThreeMonths'
  | 'updatedAtUTC'
  | 'type'
  | 'useWAForContentAutomation'
  | 'wordCloudSupportingText';

export type CampaignDataToSend = Omit<CampaignInputs, NotNeeded> & {
  KPIs: string;
  cmcType: string;
};

export type CampaignDataToUpdate = Omit<CampaignDataToSend, 'brandLogoURL'>;

export type CampaignDataToSendSimple = {
  campaignName: string;
  brandId: string;
  brandName: string;
  cmcReportVersion: number;
  status: CampaignStatusEnum;
  engagementInsights: string[];
};

export type UpdateCampaignProposalsInput = {
  brandId: string;
  campaignId: string;
  campaignName: string;
  proposalEmails: string[];
  status: CampaignStatusEnum;
};

export type CMCReportv3S3Data = {
  totalAudience: number;
  totalCommunities: number;
  phaseIdeaDetails: IUpdatedPhaseIdeaValues;
  brandObjective: string;
  keyFindings: IUpdatedPhaseIdeaValues;
  overallSnapshot: { name: string; statistics: { value: number } }[];
  results: IUpdatedResultSection;
  kpiDetails: IUpdatedKPISection;
  brandShareOfVoice: BrandShareofVoiceDetails;
  brandSentiment: BrandSentitmentSection;
  wordCloud: IWordCloudSection;
  engagementInsight: IEngagementInsightSection;
  topPerformingPosts: TopPerformingPostSection;
  allPosts: TopPerformingPostSection;
  referenceConversation: { brandShareOfVoice: {} };
};

export type UpdateCampaignInput = {
  brandId: string;
  campaignId: string;
  campaignName: string;
  startDateAtUTC?: string | null;
  endDateAtUTC?: string | null;
  status?: CampaignStatusEnum | null;
  details?: string | null;
  objective?: string | null;
  keywords?: Array<string | null> | null;
  keywordsExcluded?: string[];
  proposalEmails?: Array<string | null> | null;
  brandName?: string | null;
  keywordBrand?: string | null;
  keywordCategory?: string | null;
  keywordSubCategories?: Array<string | null> | null;
  campaignSummary?: string | null;
  cmcReportName?: string | null;
  s3ReportUrl?: string | null;
  taskTitle?: string | null;
  campaignPeriod?: string | null;
  timezoneName?: string | null;
  campaignBriefForCommunityAdmin: string | null;
  s3CoverImageUrl?: string | null;
  cmcReportVersion: number | null;
  defaultPostContentType?: string | null;
  typeformId: string | null;
  phaseIdea: string;
  currentPhase?: string | null;
  totalPhase?: string;
  currency?: string;
  communicationChannel?: string | null;
  keyFindings?: string;
  brandObjective?: string;
  phaseIdeaSupportingText?: string;
  keyFindingsSupportingText?: string;
  resultsSupportingText?: string;
  kpiSupportingText?: string;
  brandShareOfVoiceSupportingText?: string;
  brandSentimentSupportingText?: string;
  wordCloudSupportingText: string;
  engagementInsightSupportingText?: string;
  topPerformingPostSupportingText?: string;
  productPurchaseInfo?: string | null;
  productPurchaseRequired: boolean | null;
  trainingLinkMessage?: string | null;
  assetsTextRequired?: boolean | null;
  assetsImagesRequired?: string | null;
  assetsVideoRequired?: boolean | null;
};
