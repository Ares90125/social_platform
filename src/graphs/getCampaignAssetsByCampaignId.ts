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
  query getCampaignAssets($campaignId: String!) {
    getCampaignAssets(campaignId: $campaignId) {
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

export const getCampaignAssetsByCampaignId = async (
  campaignId: string,
): Promise<CampaignAsset[]> => {
  const gqlAPIServiceArguments: { campaignId: string } = { campaignId };
  const { getCampaignAssets } = await requestApi<
    typeof gqlAPIServiceArguments,
    { getCampaignAssets: CampaignAsset[] }
  >(statement, gqlAPIServiceArguments);

  return getCampaignAssets;
};
