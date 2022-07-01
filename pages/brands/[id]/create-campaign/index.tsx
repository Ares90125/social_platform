import Head from 'next/head';
import type { NextPage } from 'next';
import { CreateCampaignScreen } from '../../../../src/components/screens/createCampaign/CreateCampaign';

const CreateCampaign: NextPage = () => (
  <>
    <Head>
      <title>Manage Brands Campaigns</title>
    </Head>
    <CreateCampaignScreen />
  </>
);

export default CreateCampaign;
