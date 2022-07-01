/* eslint-disable @typescript-eslint/indent */
import { gql } from 'graphql-request';
import { CampaignAssetsStatus } from '../utils/enums/campaignAssetsStatus';
import { CampaignCommunityStatus } from '../utils/enums/campaignCommunityStatus';
import { PaymentStatus } from '../utils/enums/paymentStatus';
import { PostContentType } from '../utils/enums/postContentType';
import { TaskStatus } from '../utils/enums/taskStatus';
import { TaskType } from '../utils/enums/taskTypeEnum';
import { VerificationStatus } from '../utils/enums/verificationStatus';
import { requestApi } from './request';

export type CampaignGroupAndTaskDetails = {
  campaignAssetProposalSent: boolean;
  coverImageUrl?: string | null;
  campaignId: string | null;
  groupId: string | null;
  id: string | null;
  groupName: string | null;
  memberCount: number | null;
  memberEngagementRateUTC: number | null;
  postEngagementRateUTC: number | null;
  businessCategory: string | null;
  state: string | null;
  groupInstallationStartedAtUTC: string | null;
  totalKeywordMentions: number | null;
  totalHashtagMentions: number | null;
  totalBrandMentions: number | null;
  iconUrl: string | null;
  campaignPostEngagementRateLastNinetyDays: number | string | null;
  postsEngagementRateLastNinetyDays: number | string | null;
  categoryDensity: number | string | null;
  fbGroupId: string | null;
  topTenCities: string | null;
  location: string | null;
  averageTopPostsReach: number | string | null;
  communityAdminId: string | null;
  communityAdminName: string | null;
  communityAdminContact: string | null;
  communityManagerId: string | null;
  pricing: number | null;
  currency: string | null;
  timezone: string | null;
  defaultTaskDate: string | null;
  modeOfCommunication: string | null;
  modeOfCommunicationVerificationStatus: VerificationStatus;
  paymentAmountPaid: number | null;
  paymentStatus: PaymentStatus;
  paymentRemarks: string | null;
  paymentDate: string | null;
  isPaymentInfoAvailable: Boolean;
  groupTaskStatus: CampaignCommunityStatus;
  postType: PostContentType;
  campaignGroupTaskId: string | null;
  isAcceptedByCommunityAdmin: Boolean;
  cohort: string | null;
  metadata: string | null;
  taskId: string | null;
  userId: string | null;
  userName: string | null;
  status: TaskStatus;
  title: string | null;
  toBePerformedByUTC: string | null;
  type: TaskType;
  text: string | null;
  imageUrls: [string];
  videoUrls: [string];
  linkUrls: [string];
  period: string | null;
  reasonForFailure: string | null;
  fbPermlink: string | null;
  isPlaceholder: boolean | null;
  errorFromSource: string | null;
  timezoneName: string | null;
  assetsKpis: {
    campaignAssetsApproved: number;
    campaignAssetsApprovedAll: boolean;
    campaignAssetsDeclined: number;
    campaignAssetsHasDeclined: boolean;
    campaignAssetsHasPending: boolean;
    campaignAssetsInitial: boolean;
    campaignAssetsPending: number;
    campaignAssetsStatus: CampaignAssetsStatus;
  };
};

export type MetaColumns = {
  country: string;
  region: string;
  isMonetized: string;
  isMonetizable: string;
  isAnyCampaignTaskToBePerformedThisMonth: string;
  averageActiveMember: string;
};

export type NormalizedCommunity = Omit<
  CampaignGroupAndTaskDetails,
  'pricing' | 'paymentAmountPaid' | 'groupTaskStatus'
> &
  MetaColumns & {
    convertedMemberCount: string | null;
    linkToFb: string;
    pricing: string | number | null;
    paymentAmountPaid: string | number | null;
    groupTaskStatus: string | null
  };

const campaignGroupsAndTaskDetailsReturnAttributes = `
  campaignId
  groupId
  id
  groupName
  memberCount
  memberEngagementRateUTC
  postEngagementRateUTC
  businessCategory
  state
  groupInstallationStartedAtUTC
  totalKeywordMentions
  totalHashtagMentions
  totalBrandMentions
  iconUrl
  campaignPostEngagementRateLastNinetyDays
  postsEngagementRateLastNinetyDays
  categoryDensity
  fbGroupId
  topTenCities
  location
  averageTopPostsReach
  communityAdminId
  communityAdminName
  communityAdminContact
  communityManagerId
  pricing
  currency
  timezone
  defaultTaskDate
  modeOfCommunication
  modeOfCommunicationVerificationStatus
  paymentAmountPaid
  paymentStatus
  paymentRemarks
  paymentDate
  isPaymentInfoAvailable
  groupTaskStatus
  postType
  campaignGroupTaskId
  isAcceptedByCommunityAdmin
  cohort
  metadata
  taskId
  userId
  userName
  status
  title
  toBePerformedByUTC
  type
  text
  imageUrls
  videoUrls
  linkUrls
  period
  reasonForFailure
  fbPermlink
  isPlaceholder
  errorFromSource
  timezoneName
  campaignAssetProposalSent
  owner
  postType
  assetsKpis {
    campaignAssetsApproved
    campaignAssetsApprovedAll
    campaignAssetsDeclined
    campaignAssetsHasDeclined
    campaignAssetsHasPending
    campaignAssetsInitial
    campaignAssetsPending
    campaignAssetsStatus
  }
`;

const statement = gql`
  query listCampaignGroupsAndTasksDetails($campaignId: String!, $brandId: String!) {
    listCampaignGroupsAndTasksDetails(campaignId: $campaignId, brandId: $brandId) {
      __typename
      items {
        ${campaignGroupsAndTaskDetailsReturnAttributes}
      }
      nextToken
    }
  }
`;

export const listCampaignGroupsAndTasksDetails = async (
  campaignId: string,
  brandId: string,
  nextToken?: string,
): Promise<CampaignGroupAndTaskDetails[]> => {
  const gqlAPIServiceArguments = {
    campaignId,
    brandId,
    nextToken,
  };

  const result = await requestApi<
    typeof gqlAPIServiceArguments,
    {
      listCampaignGroupsAndTasksDetails: {
        items: CampaignGroupAndTaskDetails[];
      };
    }
  >(statement, gqlAPIServiceArguments);

  return result.listCampaignGroupsAndTasksDetails.items;
};
