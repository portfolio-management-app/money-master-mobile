import { APP_CONTENT } from 'shared/constants';
import { yupParserNumber } from 'utils/string';
import * as Yup from 'yup';

const FORM_ERROR = APP_CONTENT.formErrors;

export const CreateAssetSchema = Yup.object().shape({
  name: Yup.string().required(FORM_ERROR.requiredFiled),
  initBalance: Yup.number()
    .transform(yupParserNumber)
    .required(FORM_ERROR.requiredFiled)
    .positive(FORM_ERROR.mustBeANumber),
  currency: Yup.string().required(FORM_ERROR.requiredFiled),
});
