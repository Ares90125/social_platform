import type { NextPage } from 'next';
import Head from 'next/head';
import { ManageBrandsScreen } from '../src/components/screens/manageBrands/ManageBrands';

const ManageBrands: NextPage = () => (
  <>
    <Head>
      <title>Manage Brands</title>
    </Head>
    <ManageBrandsScreen />
  </>
);

export default ManageBrands;
