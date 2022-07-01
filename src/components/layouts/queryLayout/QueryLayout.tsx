import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { useAuth } from '../../../context/auth';
import { SessionLayout } from './SessionLayout';

type QueryLayoutProps = {
  pageProps: any;
  children: JSX.Element;
};

type Error = {
  response: {
    status: number;
    errors: { errorType: string; message: string }[];
  };
};

export const QueryLayout = ({
  children,
  pageProps,
}: QueryLayoutProps): JSX.Element | null => {
  const router = useRouter();
  const { user, refreshSession } = useAuth();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchInterval: false,
            refetchOnWindowFocus: false,
            refetchIntervalInBackground: false,
          },
        },
      }),
  );

  useEffect(() => {
    queryClient.setDefaultOptions({
      queries: {
        ...queryClient.getDefaultOptions().queries,
        retry: (_: number, err): boolean => {
          const e = err as Error;

          if (e?.response?.status === 401 && user) {
            refreshSession();
            return true;
          }

          if (e?.response?.status === 401 && !user) {
            router.push('/cs-admin-login');
            return false;
          }

          return false;
        },
        retryDelay: (_: number, err): number => {
          const e = err as Error;

          if (e?.response?.status === 401) {
            return 500;
          }

          return 0;
        },
        onError: (): void => {},
      },
    });
  }, [user]);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SessionLayout>{children}</SessionLayout>
      </Hydrate>
    </QueryClientProvider>
  );
};
