import React, { useContext, createContext } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { useProvideToast, UseProvideToastType } from '../hooks/useProvideToast';

const toastContext = createContext<UseProvideToastType>(
  {} as UseProvideToastType,
);
export const useToast = (): UseProvideToastType => useContext(toastContext);

export const ToastAlertProvider: React.FC = ({ children }) => {
  const toastConext = useProvideToast();
  const { toastType, toastMessage, isOpen, handleToastClose } = toastConext;

  return (
    <toastContext.Provider value={toastConext}>
      {children}
      {isOpen && (
        <Snackbar
          open={isOpen}
          autoHideDuration={5000}
          onClose={handleToastClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Alert
            onClose={handleToastClose}
            severity={toastType}
            sx={{ width: '100%', maxWidth: '500px' }}
          >
            {toastMessage}
          </Alert>
        </Snackbar>
      )}
    </toastContext.Provider>
  );
};
