import { gql } from 'graphql-request';
import { CampaignAsset } from './createCampaignGroupAsset';
import { requestApi } from './request';

const statement = gql`
  mutation updateCampaignGroupAsset(
    $campaignId: String!
    $groupId: String!
    $input: UpdateAssetInput!
  ) {
    updateCampaignGroupAsset(
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

export type UpdateAssetInput = {
  id: string;
  status: string;
  value: string;
  rejectReason?: string | null;
  assignedContentUserId?: string | null;
};

export type UpdateCampaignGroupAssetsByIdsArgs = {
  campaignId: string;
  groupId: string;
  input: UpdateAssetInput;
};

export const updateCampaignGroupAssetsByIds = async (
  assetInfo: UpdateCampaignGroupAssetsByIdsArgs,
): Promise<CampaignAsset> => {
  const result = await requestApi<
    UpdateCampaignGroupAssetsByIdsArgs,
    { updateCampaignGroupAsset: CampaignAsset }
  >(statement, assetInfo);

  return result.updateCampaignGroupAsset;
};
