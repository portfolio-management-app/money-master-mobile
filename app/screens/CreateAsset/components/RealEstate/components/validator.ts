import { yupParserNumber } from 'utils/string';
import * as Yup from 'yup';
import { APP_CONTENT } from 'shared/constants';

const FORM_ERROR = APP_CONTENT.formErrors;

export const CreateAssetSchema = Yup.object().shape({
  name: Yup.string().required(FORM_ERROR.requiredFiled),
  inputCurrency: Yup.string().required(FORM_ERROR.requiredFiled),
  buyPrice: Yup.number()
    .transform(yupParserNumber)
    .required(FORM_ERROR.requiredFiled)
    .positive(FORM_ERROR.mustBeANumber),
  currentPrice: Yup.number()
    .transform(yupParserNumber)
    .required(FORM_ERROR.requiredFiled)
    .positive(FORM_ERROR.mustBeANumber),
});
