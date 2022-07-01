import Head from 'next/head';
import type { NextPage } from 'next';
import { Campaign } from '../../../../src/components/screens/campaign/Campaign';

const NewCampaign: NextPage = () => (
  <>
    <Head>
      <title>Manage Brands Campaigns</title>
    </Head>
    <Campaign />
  </>
);

export default NewCampaign;
