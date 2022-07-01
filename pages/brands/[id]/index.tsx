import type { NextPage } from 'next';
import Head from 'next/head';
import { Brand } from '../../../src/components/screens/brand/Brand';

const ManageBrands: NextPage = () => (
  <>
    <Head>
      <title>Manage Brands Campaigns</title>
    </Head>
    <Brand />
  </>
);

export default ManageBrands;
