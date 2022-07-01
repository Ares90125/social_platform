import request, { gql } from 'graphql-request';
import * as _ from 'lodash';
import {
  CampaignDataResponse,
  CampaignInputs,
} from '../components/screens/campaign/components/detailsTab/campaign.types';
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

export const getCampaignsByBrandId = async (
  userToken: string,
  brandId?: string,
  nextToken?: string,
): Promise<CampaignDataResponse[] | null> => {
  const query = gql`query GetCampaignsByBrandId($brandId: String!, $nextToken: String) {
    getCampaignsByBrandId(brandId: $brandId, nextToken: $nextToken) {
      __typename
      items {
        ${campaignsReturnAttributes}
      }
      nextToken
    }
  }`;

  const gqlAPIServiceArguments: Partial<{
    nextToken: string | null;
    brandId: string;
  }> = {
    brandId,
  };
  if (nextToken) {
    gqlAPIServiceArguments.nextToken = nextToken;
  }

  const result = await request({
    url: 'https://graph.develop.convosight.com/graphql',
    document: query,
    variables: gqlAPIServiceArguments,
    requestHeaders: {
      authorization: userToken,
    },
  });

  return <CampaignDataResponse[] | null>result.getCampaignsByBrandId.items;
};

export const getAllCampaigns = async (
  brandId?: string,
): Promise<CampaignInputs[]> => {
  if (!brandId) return [];

  const token = getCookieByName('token') as string;
  const campaigns = await getCampaignsByBrandId(token, brandId);

  if (!campaigns || campaigns.length === 0) return [];

  return _.orderBy(
    campaigns.map((c) => ({
      ...c,
      KPIs: JSON.parse(c.KPIs),
      cmcType: JSON.parse(c.cmcType),
    })),
    [(campaign): string | null => campaign.startDateAtUTC],
    ['desc'],
  );
};
