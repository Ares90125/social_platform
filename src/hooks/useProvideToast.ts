import { useState } from 'react';

type ToastState = {
  type: ToastTypes
  message: React.ReactNode
  open: boolean
};
export type UseProvideToastType = {
  toastType: ToastTypes
  toastMessage: React.ReactNode
  isOpen: boolean
  setErrorToast: (message?: React.ReactNode) => void
  setSuccessToast: (message?: React.ReactNode) => void
  setInfoToast: (message: React.ReactNode) => void
  setWarningToast: (message: React.ReactNode) => void
  handleToastClose: (event?: React.SyntheticEvent | Event, reason?: string) => void
};
export type ToastTypes = 'error' | 'success' | 'info' | 'warning';

export const useProvideToast = (): UseProvideToastType => {
  const [toastType, setToastType] = useState<ToastTypes>('info');
  const [toastMessage, setToastMessage] = useState<React.ReactNode>('');
  const [isOpen, setIsOpen] = useState(false);

  const setToastState = (newState: ToastState): void => {
    const { type, message, open } = newState;
    setToastType(type);
    setToastMessage(message);
    setIsOpen(open);
  };

  const setErrorToast = (message?: React.ReactNode): void => {
    setToastState({
      type: 'error',
      message: message || 'Error',
      open: true,
    });
  };

  const setSuccessToast = (message?: React.ReactNode): void => {
    setToastState({
      type: 'success',
      message: message || 'Success!',
      open: true,
    });
  };

  const setInfoToast = (message: React.ReactNode): void => {
    setToastState({
      type: 'info',
      message,
      open: true,
    });
  };

  const setWarningToast = (message: React.ReactNode): void => {
    setToastState({
      type: 'warning',
      message,
      open: true,
    });
  };
  const handleToastClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ): void => {
    if (reason === 'clickaway') {
      return;
    }
    setToastState({
      type: 'info',
      message: '',
      open: false,
    });
  };

  return {
    toastType,
    toastMessage,
    isOpen,
    handleToastClose,
    setErrorToast,
    setSuccessToast,
    setInfoToast,
    setWarningToast,
  };
};
