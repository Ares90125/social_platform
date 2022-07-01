import { gql } from 'graphql-request';
import { requestApi } from './request';

const statement = gql`
  mutation deleteCMCampaignGroups(
    $campaignId: String!
    $groupIds: [String!]!
    $taskIds: [String!]
  ) {
    deleteCMCampaignGroups(
      campaignId: $campaignId
      groupIds: $groupIds
      taskIds: $taskIds
    )
  }
`;

export const deleteCMCampaignGroups = async (
  campaignId: string,
  groupIds: string[],
  taskIds: string[] = [],
): Promise<string> => {
  const gqlAPIServiceArguments: {
    campaignId: string;
    groupIds: string[];
    taskIds: string[];
  } = { campaignId, groupIds, taskIds };
  const result = await requestApi<
    typeof gqlAPIServiceArguments,
    { data: string }
  >(statement, gqlAPIServiceArguments);

  return result.data;
};
