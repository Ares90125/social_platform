import { gql } from 'graphql-request';
import { requestApi } from './request';

const statement = gql`
  query DownloadCampaignGroupAssetsExcel($campaignId: String!) {
    downloadCampaignGroupAssetsExcel(campaignId: $campaignId) {
      url
    }
  }
`;

export const downloadCampaignGroupAssetsExcel = async (
  campaignId: string,
): Promise<{ url: string }> => {
  const gqlAPIServiceArguments: {
    campaignId: string;
  } = { campaignId };
  const result = await requestApi<
    typeof gqlAPIServiceArguments,
    { downloadCampaignGroupAssetsExcel: { url: string } }
  >(statement, gqlAPIServiceArguments);

  return result.downloadCampaignGroupAssetsExcel;
};
