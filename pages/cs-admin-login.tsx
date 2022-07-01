import type { NextPage } from 'next';
import Head from 'next/head';
import { Login } from '../src/components/screens/login/Login';

const CSAdminLogin: NextPage = () => (
  <>
    <Head>
      <title>Convosight</title>
    </Head>
    <Login />
  </>
);

export default CSAdminLogin;
