import { gql } from 'graphql-request';
import { requestApi } from './request';

const statement = gql`
  mutation MarkDeleteCampaignTask($campaignId: String!, $groupId: String!) {
    markDeleteCampaignTask(campaignId: $campaignId, groupId: $groupId) {
      status
    }
  }
`;

export type MarkDeleteCampaignTaskInput = {
  campaignId: string;
  groupId: string;
};

export const markDeleteCampaignTask = async (
  input: MarkDeleteCampaignTaskInput,
): Promise<string> => {
  const response = await requestApi<
    MarkDeleteCampaignTaskInput,
    { markDeleteCampaignTask: { status: string } }
  >(statement, input);

  return response.markDeleteCampaignTask.status;
};
