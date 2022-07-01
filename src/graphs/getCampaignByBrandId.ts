import { gql } from 'graphql-request';
import { requestApi } from './request';

  // export const getCampaignByBrandId = async (
  //   brandId: string,
  // ): Promise<CampaignAsset[]> => {
  //   const gqlAPIServiceArguments: { campaignId: string } = { campaignId };
  //   const { getCampaignAssets } = await requestApi<
  //     typeof gqlAPIServiceArguments,
  //     { getCampaignAssets: CampaignAsset[] }
  //   >(statement, gqlAPIServiceArguments);

  //   return getCampaignAssets;
  // };
