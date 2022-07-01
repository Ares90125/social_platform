import { gql } from 'graphql-request';
import { requestApi } from './request';

export type CampaignAssetItem = {
  assignedContentUserId: string | null;
  id: string;
  rejectReason: string | null;
  status: string;
  type?: 'image' | 'text' | 'video' | 'address';
  value: string;
  updatedAtInSeconds?: number;
  updatedByContentTeam?: boolean;
};

export type CampaignAsset = {
  brandId: string;
  brandName: string;
  campaignId: string;
  campaignName: string;
  communityAdminName: string;
  groupId: string;
  groupName: string;
  items: CampaignAssetItem[];
  rating: number;
  status: string;
};

const statement = gql`
  query getCampaignGroupAsset($campaignId: String!, $groupId: String!) {
    getCampaignGroupAsset(campaignId: $campaignId, groupId: $groupId) {
      brandId
      brandName
      campaignId
      campaignName
      communityAdminName
      groupId
      groupName
      items {
        assignedContentUserId
        id
        rejectReason
        status
        type
        value
        updatedAtInSeconds
        updatedByContentTeam
      }
      rating
      status
    }
  }
`;

export const getCampaignGroupAssetsByIds = async (
  campaignId: string,
  groupId: string,
): Promise<CampaignAsset> => {
  const gqlAPIServiceArguments: { campaignId: string; groupId: string } = {
    campaignId,
    groupId,
  };
  const { getCampaignGroupAsset } = await requestApi<
    typeof gqlAPIServiceArguments,
    { getCampaignGroupAsset: CampaignAsset }
  >(statement, gqlAPIServiceArguments);

  return getCampaignGroupAsset;
};
