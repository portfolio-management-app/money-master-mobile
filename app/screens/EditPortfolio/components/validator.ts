import { APP_CONTENT } from 'shared/constants';
import * as Yup from 'yup';

const FORM_ERROR = APP_CONTENT.formErrors;

export const EditPortfolioSchema = Yup.object().shape({
  newName: Yup.string().required(FORM_ERROR.requiredFiled),
  newCurrency: Yup.string().required(FORM_ERROR.requiredFiled),
});
