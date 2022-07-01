import { gql } from 'graphql-request';
import { requestApi } from './request';

const statement = gql`
  query downloadCMCExecutionExcel($campaignId: String!) {
    downloadCMCExecutionExcel(campaignId: $campaignId) {
      body
    }
  }
`;

export const downloadCMCExecutionExcel = async (
  campaignId: string,
): Promise<string> => {
  const gqlAPIServiceArguments: { campaignId: string } = { campaignId };
  const result = await requestApi<
    typeof gqlAPIServiceArguments,
    { downloadCMCExecutionExcel: { body: string } }
  >(statement, gqlAPIServiceArguments);

  return result.downloadCMCExecutionExcel.body;
};
