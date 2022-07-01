import { gql } from 'graphql-request';
import { requestApi } from './request';

const statement = gql`
  mutation CmcSendRating(
    $campaignId: String!
    $groupId: String!
    $rating: Int!
  ) {
    cmcSendRating(campaignId: $campaignId, groupId: $groupId, rating: $rating) {
      status
    }
  }
`;

export type CmcSendRatingArgs = {
  campaignId: string;
  groupId: string;
  rating: number;
};

export const cmcSendRating = async (
  input: CmcSendRatingArgs,
): Promise<{ status: string }> => {
  const result = await requestApi<
    CmcSendRatingArgs,
    { cmcSendRating: { status: string } }
  >(statement, input);

  return result.cmcSendRating;
};
