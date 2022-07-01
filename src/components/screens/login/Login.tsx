import React from 'react';
import Image from 'next/image';
import * as LS from './login.styled';
import { LoginForm } from './components/loginForm/LoginForm';

export const Login: React.FC = () => (
  <LS.LoginPageWrapper>
    <LS.LoginLogoWrapper>
      <Image
        src="/icons/convosight_logo.svg"
        alt="convosight logo"
        width={130}
        height={34}
      />
    </LS.LoginLogoWrapper>
    <LS.LoginIllustrationWrapper>
      <Image
        src="/icons/login_page_illustration.svg"
        alt="login page illustration"
        width={580}
        height={595}
      />
    </LS.LoginIllustrationWrapper>
    <LS.LoginFormContainer>
      <LS.LoginFormHeader>
        <h1>Welcome to Convosight Admin!</h1>
        <p>Login to your account</p>
      </LS.LoginFormHeader>
      <LS.LoginFormContent>
        <LoginForm />
      </LS.LoginFormContent>
    </LS.LoginFormContainer>
    <LS.RequestAccessWrapper>
      Don’t have an account?
      <a
        href="mailto:tarun@babydestination.com"
        rel="noopener noreferrer"
        target="_blank"
      >
        Request access
      </a>
    </LS.RequestAccessWrapper>
  </LS.LoginPageWrapper>
);
