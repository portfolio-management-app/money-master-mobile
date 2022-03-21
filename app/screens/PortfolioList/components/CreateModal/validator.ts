import { APP_CONTENT } from 'shared/constants';
import * as Yup from 'yup';

const FORM_ERROR = APP_CONTENT.formErrors;

export const CreatePortfolioSchema = Yup.object().shape({
  name: Yup.string().required(FORM_ERROR.requiredFiled),
  currency: Yup.string().required(FORM_ERROR.requiredFiled),
});
