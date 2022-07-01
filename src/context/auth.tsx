import React, { useContext, createContext } from 'react';
import { useProvideAuth, UseProvideAuthType } from '../hooks/useProvideAuth';

const authContext = createContext<UseProvideAuthType>({} as UseProvideAuthType);

export const AuthProvider: React.FC = ({ children }) => {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = (): UseProvideAuthType => useContext(authContext);
