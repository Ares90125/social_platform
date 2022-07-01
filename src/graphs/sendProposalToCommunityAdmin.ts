import { gql } from 'graphql-request';
import { requestApi } from './request';

const statement = gql`
  mutation SendProposalToCommunityAdmin(
    $campaignId: String!
    $communityAdminId: String!
    $groupId: String!
  ) {
    sendProposalToCommunityAdmin(
      campaignId: $campaignId
      communityAdminId: $communityAdminId
      groupId: $groupId
    ) {
      status
    }
  }
`;

export type SendProposalToCommunityAdminInput = {
  campaignId: string;
  communityAdminId: string;
  groupId: string;
};

export const sendProposalToCommunityAdmin = async (
  input: SendProposalToCommunityAdminInput,
): Promise<{ status: string }> => {
  const result = await requestApi<
    SendProposalToCommunityAdminInput,
    { sendProposalToCommunityAdmin: { status: string } }
  >(statement, input);
  return result.sendProposalToCommunityAdmin;
};
