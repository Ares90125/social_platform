import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';
import { UserPool } from '../utils/helpers/user-pool';
import { LoginFormInputs } from '../components/screens/login/components/loginForm/loginForm.types';
import { getCookieByName, setCookie } from '../utils/helpers/cookies';
import { UserSchema } from '../api/User/UserSchema';
import { getUser } from '../graphs/user';

export type UseProvideAuthType = {
  user: CognitoUser | null;
  updateUser: (userData: CognitoUser | null) => void;
  loading: boolean;
  error: string;
  handleUser: (data: LoginFormInputs) => void;
  checkingUser: boolean;
  refreshSession: () => void;
  userConvo: UserSchema | null;
};

export const useProvideAuth = (): UseProvideAuthType => {
  const [userConvo, setUserConvo] = useState<UserSchema | null>(null);
  const [user, setUser] = useState<CognitoUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [checkingUser, setCheckingUser] = useState(true);
  const router = useRouter();

  const getUserConvo = async (token: string): Promise<void> => {
    if (!token) {
      setUserConvo(null);

      return;
    }

    const uConvo = await getUser(token);

    setUserConvo(uConvo);
  };

  const refreshSession = (): void => {
    user?.getSession(
      (err: Error | null, session: CognitoUserSession | null) => {
        if (!err && session) {
          const refreshToken = session.getRefreshToken();

          user.refreshSession(
            refreshToken,
            async (e, data: CognitoUserSession) => {
              if (!e && data) {
                const token = data.getAccessToken().getJwtToken();

                await getUserConvo(token);
                setCookie('token', token);

                return;
              }

              router.push('/cs-admin-login');
            },
          );

          return;
        }

        router.push('/cs-admin-login');
      },
    );
  };

  const updateUser = (userData: CognitoUser | null): void => {
    setUser(userData);
  };

  const handleUser = ({ email, password }: LoginFormInputs): void => {
    setLoading(true);

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    cognitoUser.authenticateUser(authDetails, {
      onSuccess: async (data: CognitoUserSession) => {
        const token = data.getIdToken().getJwtToken();
        // console.log(token);
        await getUserConvo(token);
        setCookie('token', data.getIdToken().getJwtToken());
        updateUser(cognitoUser);
        setLoading(false);
        setError('');

        router.push('/manage-brands');
      },

      onFailure: (err) => {
        setError(err.message);
        setLoading(false);
      },
    });
  };

  useEffect(() => {
    const userData = UserPool.getCurrentUser();
    const token = getCookieByName('token');

    setUser(userData);
    setCheckingUser(false);

    if (token) {
      getUserConvo(token);
    }
  }, []);

  return {
    user,
    updateUser,
    loading,
    error,
    handleUser,
    checkingUser,
    refreshSession,
    userConvo,
  };
};
