import { yupParserNumber } from 'utils/string';
import { i18n } from 'i18n';
import { localeKey } from 'services/storage';
import * as Yup from 'yup';

const FORM_ERROR = i18n[localeKey].formErrors;

export const CreatePortfolioSchema = Yup.object().shape({
  name: Yup.string().required(FORM_ERROR.requiredFiled),
  initBalance: Yup.number()
    .transform(yupParserNumber)
    .required(FORM_ERROR.requiredFiled)
    .positive(FORM_ERROR.mustBeANumber),
  currency: Yup.string().required(FORM_ERROR.requiredFiled),
});
