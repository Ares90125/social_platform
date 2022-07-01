import { gql } from 'graphql-request';
import { requestApi } from './request';

export type DeleteCampaignGroupAssetArgs = {
  campaignId: string;
  groupId: string;
  itemId: string;
};

const statement = gql`
  mutation DeleteCampaignGroupAsset(
    $campaignId: String!
    $groupId: String!
    $itemId: String!
  ) {
    deleteCampaignGroupAsset(
      campaignId: $campaignId
      groupId: $groupId
      itemId: $itemId
    ) {
      status
    }
  }
`;

export const deleteCampaignGroupAsset = async (
  assetInfo: DeleteCampaignGroupAssetArgs,
): Promise<string> => {
  const result = await requestApi<
    DeleteCampaignGroupAssetArgs,
    { deleteCampaignGroupAsset: { status: string } }
  >(statement, assetInfo);

  return result.deleteCampaignGroupAsset.status;
};
