import { gql } from 'graphql-request';
import { requestApi } from './request';

const statement = gql`
  mutation BrandApproveCampaign($campaignId: String!, $groupId: String) {
    brandApproveCampaign(campaignId: $campaignId, groupId: $groupId) {
      status
    }
  }
`;

export type BrandApproveCampaignInput = {
  campaignId: string;
  groupId: string;
};

export const brandApproveCampaign = async (
  input: BrandApproveCampaignInput,
): Promise<string> => {
  const response = await requestApi<
    BrandApproveCampaignInput,
    { brandApproveCampaign: { status: string } }
  >(statement, input);

  return response.brandApproveCampaign.status;
};
