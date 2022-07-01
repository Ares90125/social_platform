import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import Amplify, { Storage } from 'aws-amplify';
import { createTheme, ThemeProvider } from '@mui/material';
import { AuthProvider } from '../src/context/auth';
import createEmotionCache from '../src/utils/helpers/create-emotion-cache';
import { QueryLayout } from '../src/components/layouts/queryLayout/QueryLayout';
import '../src/assests/scss/globals.scss';
import '../src/assests/scss/unicode-editor.scss';
import { ToastAlertProvider } from '../src/context/toast';
import { AmplifyConfig } from '../src/config/config';

Amplify.configure(AmplifyConfig);
Storage.configure({ track: true });

const clientSideEmotionCache = createEmotionCache();

type MyAppProps = AppProps & {
  emotionCache?: EmotionCache;
};

const myTheme = createTheme({});

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps): JSX.Element {
  return (
    <ThemeProvider theme={myTheme}>
      <AuthProvider>
        <ToastAlertProvider>
          <QueryLayout pageProps={pageProps}>
            <CacheProvider value={emotionCache}>
              <Head>
                <link rel="shortcut icon" href="/icons/favicon.png" />
              </Head>
              <Component {...pageProps} />
            </CacheProvider>
          </QueryLayout>
        </ToastAlertProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
