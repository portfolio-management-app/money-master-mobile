import { LocaleStore } from 'shared/stores';
import { i18n } from 'i18n';
import * as Yup from 'yup';

const parseToNumber = (value: any, originalValue: any) => {
  if (originalValue === '') return -1;
  originalValue = originalValue * 1;
  if (isNaN(originalValue)) {
    return -1;
  }
  return originalValue;
};

const errorMessages =
  i18n[LocaleStore.currentLocale].interestAssets.addModel.errors;

export const validateSchema = Yup.object().shape({
  assetName: Yup.string().required(errorMessages.requiredFiled),
  currentAsset: Yup.number()
    .transform(parseToNumber)
    .required(errorMessages.requiredFiled)
    .positive(errorMessages.mustBeANumber),
  interestRate: Yup.number()
    .transform(parseToNumber)
    .required(errorMessages.requiredFiled)
    .positive(errorMessages.mustBeANumber)
    .lessThan(101, errorMessages.lessThan100),
  interestValue: Yup.number()
    .transform(parseToNumber)
    .required(errorMessages.requiredFiled)
    .integer(errorMessages.mustBeInteger)
    .positive(errorMessages.mustBeANumber),
});
