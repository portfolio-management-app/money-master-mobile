import { HttpError } from 'errors/base';
export type HttpRequestResponse = {
  isError: boolean;
  response: HttpError | any;
};

export type ErrorBounderProps = {
  show: boolean;
  res: HttpError | null;
  onClose: () => void;
};

export type Variant = 'error' | 'success' | 'warning' | 'info';

export type ScreenParams = {
  name: string;
  key: string;
};

export type OnScrollProps = {
  onScroll: (e: any) => void;
};

export type ModalProps = {
  show: boolean;
  onClose: () => void;
};
