import { APP_CONTENT } from 'shared/constants';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(Yup);

const FORM_ERROR = APP_CONTENT.formErrors;

export const AuthenticationSchema = Yup.object().shape({
  email: Yup.string()
    .email(FORM_ERROR.email)
    .required(FORM_ERROR.requiredFiled),
  password: Yup.string()
    .required(FORM_ERROR.requiredFiled)
    .min(8, FORM_ERROR.password)
    .max(32, FORM_ERROR.password)
    .minNumbers(1, FORM_ERROR.password)
    .minLowercase(1, FORM_ERROR.password)
    .minUppercase(1, FORM_ERROR.password),
});
