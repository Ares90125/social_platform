import { gql } from 'graphql-request';
import { requestApi } from './request';

const statement = gql`
  query getCampaignMedia($campaignId: String!) {
    getCampaignMedia(campaignId: $campaignId) {
      body
      isBase64Encoded
    }
  }
`;

export type GetCampaignMediaInput = {
  campaignId: string;
};

export const getCampaignMedia = async (
  input: GetCampaignMediaInput,
): Promise<any> => {
  const result = await requestApi<
    GetCampaignMediaInput,
    { getCampaignMedia: { body: string; isBase64Encoded: boolean } }
  >(statement, input);
  return result.getCampaignMedia;
};
