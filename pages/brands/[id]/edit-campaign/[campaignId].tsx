import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { Campaign } from '../../../../src/components/screens/campaign/Campaign';
import { getAllCampaigns } from '../../../../src/graphs/campaigns';

const EditCampaign: NextPage = () => {
  const router = useRouter();
  const { id, campaignId } = router.query;
  const { data: campaigns, isLoading } = useQuery(
    `brand-${id}`,
    () => {
      if (typeof id === 'string') {
        return getAllCampaigns(id);
      }
      return [];
    },
    {
      enabled: !!id,
    },
  );

  const activeCampaign = campaigns?.filter(
    (campaign) => campaign?.campaignId && campaign.campaignId === campaignId,
  )[0];

  return (
    <>
      <Head>
        <title>Campaign</title>
      </Head>
      <Campaign
        campaign={activeCampaign}
        isLoading={isLoading || !activeCampaign}
      />
    </>
  );
};

export default EditCampaign;
