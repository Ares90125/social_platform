import Head from 'next/head';
import type { NextPage } from 'next';
import { CreateBrandScreen } from '../../src/components/screens/createBrand/CreateBrand';

const CreateBrand: NextPage = () => (
  <>
    <Head>
      <title>Create Brand</title>
    </Head>
    <CreateBrandScreen />
  </>
);

export default CreateBrand;
