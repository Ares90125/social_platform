import { gql } from 'graphql-request';
import { requestApi } from './request';

const statement = gql`
  mutation deleteCMCampaignGroup($campaignId: String!, $groupId: String!) {
    deleteCMCampaignGroup(campaignId: $campaignId, groupId: $groupId)
  }
`;

export const deleteCMCampaignGroup = async (
  campaignId: string,
  groupId: string,
): Promise<{ deleteCMCampaignGroup: string }> => {
  const gqlAPIServiceArguments: { campaignId: string; groupId: string } = {
    campaignId,
    groupId,
  };
  const result = await requestApi<
    typeof gqlAPIServiceArguments,
    { deleteCMCampaignGroup: string }
  >(statement, gqlAPIServiceArguments);

  return result;
};
