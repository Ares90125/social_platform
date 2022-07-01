import { useRouter } from 'next/router';
import { useAuth } from '../../../context/auth';
import { Header } from '../../header/Header';
import { Spinner } from '../../form';

type AuthLayoutProps = {
  children: JSX.Element;
};

export const AuthLayout = ({
  children,
}: AuthLayoutProps): JSX.Element | null => {
  const router = useRouter();
  const { user, checkingUser } = useAuth();

  if (checkingUser) {
    return (
      <Spinner spinnerWrapperProps={{ style: { margin: '50vh auto 0' } }} />
    );
  }

  if (!user) {
    router.push('/cs-admin-login');
    return null;
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
};
