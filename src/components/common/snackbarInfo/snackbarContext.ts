import { createContext, useContext } from 'react';

export type TSnackbar = {
  isOpen?: boolean;
  alertSeverity?: 'success' | 'error' | 'warning' | 'info';
  alertMessage?: string;
};

export type TSnackbarContext = {
  snackbar?: TSnackbar;
  setSnackbar: (snackbarParam: TSnackbar) => void;
};

export const SnackbarContext = createContext<TSnackbarContext>({
  snackbar: {},
  setSnackbar: snackbar => (snackbar = { ...snackbar }),
});
export const useSnackbarContext = () => useContext(SnackbarContext);
