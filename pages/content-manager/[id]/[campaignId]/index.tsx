import type { NextPage } from 'next';
import Head from 'next/head';
import { AuthLayout } from '../../../../src/components/layouts/authLayout/AuthLayout';
import { ContentManagerScreen } from '../../../../src/components/screens/contentManager/ContentManager';

type ContentManagerProps = {};

const ContentManager: NextPage<ContentManagerProps> = () => (
  <>
    <Head>
      <title>Content Manager</title>
    </Head>
    <AuthLayout>
      <ContentManagerScreen />
    </AuthLayout>
  </>
);

export default ContentManager;
