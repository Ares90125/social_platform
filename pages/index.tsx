import type { NextPage } from 'next';
import { AuthLayout } from '../src/components/layouts/authLayout/AuthLayout';

const Home: NextPage = () => (
  <AuthLayout>
    <p>CMC</p>
  </AuthLayout>
);

export default Home;
