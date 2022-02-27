import { i18n } from 'i18n';
import { localeKey } from 'services/storage';
import * as Yup from 'yup';

const FORM_ERROR = i18n[localeKey].formErrors;

export const AuthenticationSchema = Yup.object().shape({
  email: Yup.string()
    .email(FORM_ERROR.email)
    .required(FORM_ERROR.requiredFiled),
  password: Yup.string()
    .min(8, FORM_ERROR.password)
    .required(FORM_ERROR.requiredFiled),
});