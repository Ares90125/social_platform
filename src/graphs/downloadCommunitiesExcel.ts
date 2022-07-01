import { gql } from 'graphql-request';
import { requestApi } from './request';

const statement = gql`
  query downloadCommunitiesExcel($campaignId: String!) {
    downloadCommunitiesExcel(campaignId: $campaignId) {
      body
    }
  }
`;

export const downloadCommunitiesExcel = async (
  campaignId: string,
): Promise<string> => {
  const gqlAPIServiceArguments: { campaignId: string } = { campaignId };
  const result = await requestApi<
    typeof gqlAPIServiceArguments,
    { downloadCommunitiesExcel: { body: string } }
  >(statement, gqlAPIServiceArguments);

  return result.downloadCommunitiesExcel.body;
};
