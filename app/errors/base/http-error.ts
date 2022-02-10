import { i18n } from 'i18n';
import { LocaleStore } from 'shared/stores';
import { AxiosResponse } from 'axios';

export class HttpError {
  protected statusCode: number = 0;
  protected message: string = '';

  constructor(response?: AxiosResponse) {
    if (response) {
      this.statusCode = response.status;
      this.message = response.data;
    }
  }

  getMessage() {
    return this.message;
  }
  get code() {
    return this.statusCode;
  }

  getDefaultMessage() {
    return i18n[LocaleStore.currentLocale].httpError.default;
  }
}
