import { gql } from 'graphql-request';
import { requestApi } from './request';

const attributes = `
    assetsApproved
    assetsDeclined
    assetsPending
    campaignAccepted
    campaignPending
    campaignRejected
    campaignProductRequired
    campaignTaskCreated
    groupAssetsApproved
    campaignTotal
    groupAssetsPartial
    groupAssetsRequireDeclined
    groupAssetsRequireInitial
    groupAssetsRequireReview
`;

const statement = gql`query GetCampaignGroupAssetKpis($campaignId: String!) {
    getCampaignGroupAssetKpis(campaignId: $campaignId) {
        ${attributes}
    }
}`;

export type CampaignGroupAssetKPIs = {
  assetsApproved: number;
  assetsDeclined: number;
  assetsPending: number;
  campaignAccepted: number;
  campaignPending: number;
  campaignRejected: number;
  campaignProductRequired: number;
  campaignTaskCreated: number;
  groupAssetsApproved: number;
  campaignTotal: number;
  groupAssetsPartial: number;
  groupAssetsRequireDeclined: number;
  groupAssetsRequireInitial: number;
  groupAssetsRequireReview: number;
};

export const getCampaignGroupAssetKpis = async (
  campaignId: string,
): Promise<CampaignGroupAssetKPIs> => {
  const gqlAPIServiceArguments: { campaignId: string } = { campaignId };
  const result = await requestApi<
    typeof gqlAPIServiceArguments,
    { getCampaignGroupAssetKpis: CampaignGroupAssetKPIs }
  >(statement, gqlAPIServiceArguments);

  return result.getCampaignGroupAssetKpis;
};
