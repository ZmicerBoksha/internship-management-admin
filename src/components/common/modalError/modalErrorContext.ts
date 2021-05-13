import { createContext, useContext } from 'react';

export type TModalError = {
  isOpen?: boolean;
  errorTitle?: string;
  errorText?: string;
};

export type TModalErrorContext = {
  modalError?: TModalError;
  setModalError: (modalError: TModalError) => void;
};

export const ModalErrorContext = createContext<TModalErrorContext>({
  modalError: {},
  setModalError: modalError => (modalError = { ...modalError }),
});
export const useModalErrorContext = () => useContext(ModalErrorContext);
