import { gql } from 'graphql-request';
import { requestApi } from './request';

const statement = gql`
  mutation MarkCampaignTaskDone($campaignId: String!, $groupId: String!) {
    markCampaignTaskDone(campaignId: $campaignId, groupId: $groupId) {
      status
    }
  }
`;

export type MarkCampaignTaskDoneInput = {
  campaignId: string;
  groupId: string;
};

export const markCampaignTaskDone = async (
  input: MarkCampaignTaskDoneInput,
): Promise<string> => {
  const result = await requestApi<
    MarkCampaignTaskDoneInput,
    { markCampaignTaskDone: { status: string } }
  >(statement, input);

  return result.markCampaignTaskDone.status;
};
