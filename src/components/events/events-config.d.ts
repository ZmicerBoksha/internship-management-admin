export interface IEvent {
  id?: string | number;
}

export type TSnackbar = {
  isOpen?: boolean;
  alertSeverity?: 'success' | 'error' | 'warning' | 'info';
  alertMessage?: string;
};
