import React from 'react';
import { Spinner } from '../../form';

type LoadingLayoutProps = {
  children: JSX.Element;
  isLoading: boolean;
};

export const LoadingLayout = ({
  children,
  isLoading,
}: LoadingLayoutProps): JSX.Element | null =>
  isLoading ? (
    <Spinner spinnerWrapperProps={{ style: { margin: '50vh auto 0' } }} />
  ) : (
    children
  );
