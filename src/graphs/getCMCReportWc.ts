import { gql } from 'graphql-request';
import { requestApi } from './request';

const statement = gql`
  query GetCmcReportWc($campaignId: String!) {
    getCmcReportWC(campaignId: $campaignId) {
      createdAtUTC
      updatedAtUTC
      campaignId
      beforeWC
      duringWC
    }
  }
`;

export type CmcReportWc = {
	createdAtUTC: string | null;
	updatedAtUTC: string | null;
	campaignId: string;
	beforeWC: string | null;
	duringWC: string | null;
}

export const getCMCReportWc = async (
  campaignId: string,
): Promise<CmcReportWc> => {
  const gqlAPIServiceArguments: { campaignId: string } = { campaignId };
  const result = await requestApi<
    typeof gqlAPIServiceArguments,
    { getCmcReportWC: CmcReportWc }
  >(statement, gqlAPIServiceArguments);

  return result.getCmcReportWC;
};
