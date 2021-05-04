import { createContext, useContext } from 'react';

// For snackbar
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

// For preloader
export type TPreloaderContext = {
  loadingData: boolean;
  setLoadingData: (loadingData: boolean) => void;
};

export const PreloaderContext = createContext<TPreloaderContext>({
  loadingData: true,
  setLoadingData: loadingData => loadingData,
});
export const usePreloaderContext = () => useContext(PreloaderContext);
