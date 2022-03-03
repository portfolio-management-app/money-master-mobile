import { APP_CONTENT } from 'shared/constants';
import * as Yup from 'yup';

const FORM_ERROR = APP_CONTENT.formErrors;

export const AuthenticationSchema = Yup.object().shape({
  email: Yup.string()
    .email(FORM_ERROR.email)
    .required(FORM_ERROR.requiredFiled),
  password: Yup.string()
    .min(8, FORM_ERROR.password)
    .required(FORM_ERROR.requiredFiled),
});
