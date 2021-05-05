import { createContext, useContext } from 'react';

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
