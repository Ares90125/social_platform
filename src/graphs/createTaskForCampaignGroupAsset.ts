import { gql } from 'graphql-request';
import { requestApi } from './request';

const statement = gql`
  mutation CreateTaskForCampaignGroupAsset(
    $campaignId: String!
    $groupId: String!
  ) {
    createTaskForCampaignGroupAsset(
      campaignId: $campaignId
      groupId: $groupId
    ) {
      status
    }
  }
`;

export type CreateTaskForCampaignGroupAssetArgs = {
  campaignId: string;
  groupId: string;
};

export const createTaskForCampaignGroupAsset = async (
  taskInfo: CreateTaskForCampaignGroupAssetArgs,
): Promise<{ status: string }> => {
  const result = await requestApi<
    CreateTaskForCampaignGroupAssetArgs,
    { createTaskForCampaignGroupAsset: { status: string } }
  >(statement, taskInfo);

  return result.createTaskForCampaignGroupAsset;
};
