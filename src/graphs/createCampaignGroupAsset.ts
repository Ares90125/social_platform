import { gql } from 'graphql-request';
import { CampaignAssetItem } from './getCampaignAssetsByCampaignId';
import { requestApi } from './request';

export type CreateAssetInput = {
  type: string;
  status: string;
  value: string;
  rejectReason?: string;
  assignedContentUserId?: string;
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
  mutation CreateCampaignGroupAsset(
    $campaignId: String!
    $groupId: String!
    $input: CreateAssetInput!
  ) {
    createCampaignGroupAsset(
      campaignId: $campaignId
      groupId: $groupId
      input: $input
    ) {
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
        updatedAtInSeconds
        updatedByContentTeam
        value
      }
      rating
      status
    }
  }
`;

export type CreateCampaignGroupAssetArgs = {
  campaignId: string;
  groupId: string;
  input: CreateAssetInput;
};

export const createCampaignGroupAsset = async (
  input: CreateCampaignGroupAssetArgs,
): Promise<CampaignAsset> => {
  const result = await requestApi<
    CreateCampaignGroupAssetArgs,
    { createCampaignGroupAsset: CampaignAsset }
  >(statement, input);

  return result.createCampaignGroupAsset;
};
