import { APP_CONTENT } from 'shared/constants';
import { yupParserNumber } from 'utils/string';
import * as Yup from 'yup';

const FORM_ERROR = APP_CONTENT.formErrors;

export const CreateBankAssetSchema = Yup.object().shape({
  name: Yup.string().required(FORM_ERROR.requiredFiled),
  inputMoneyAmount: Yup.number()
    .transform(yupParserNumber)
    .required(FORM_ERROR.requiredFiled)
    .positive(FORM_ERROR.mustBeANumber),
  inputCurrency: Yup.string().required(FORM_ERROR.requiredFiled),
  interestRate: Yup.number()
    .transform(yupParserNumber)
    .required(FORM_ERROR.requiredFiled)
    .positive(FORM_ERROR.mustBeANumber)
    .lessThan(100, FORM_ERROR.lessThan100),
  termRange: Yup.number()
    .transform(yupParserNumber)
    .required(FORM_ERROR.requiredFiled)
    .positive(FORM_ERROR.mustBeANumber),
});

export const CreateRealEstateAssetSchema = Yup.object().shape({
  name: Yup.string().required(FORM_ERROR.requiredFiled),
  inputMoneyAmount: Yup.number()
    .transform(yupParserNumber)
    .required(FORM_ERROR.requiredFiled)
    .positive(FORM_ERROR.mustBeANumber),
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

export const PriceSchema = Yup.object().shape({
  purchasePrice: Yup.number()
    .transform(yupParserNumber)
    .required(FORM_ERROR.requiredFiled)
    .positive(FORM_ERROR.mustBeANumber),
  amount: Yup.number()
    .transform(yupParserNumber)
    .required(FORM_ERROR.requiredFiled)
    .positive(FORM_ERROR.mustBeANumber),
  name: Yup.string().required(FORM_ERROR.requiredFiled),
});
