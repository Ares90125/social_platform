import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { useAuth } from '../../../context/auth';

type SessionLayoutProps = {
  children: JSX.Element;
};

export const SessionLayout = ({
  children,
}: SessionLayoutProps): JSX.Element | null => {
  const router = useRouter();
  const { refreshSession } = useAuth();

  useQuery('refresh-session', refreshSession, {
    refetchInterval: 1000 * 60 * 15,
    refetchIntervalInBackground: true,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    onError: () => {
      router.push('/cs-admin-login');
    },
  });

  return children;
};
