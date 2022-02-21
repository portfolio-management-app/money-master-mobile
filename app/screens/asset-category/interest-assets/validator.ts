import { i18n } from 'i18n';
import { LocaleStore } from 'shared/stores';
import * as Yup from 'yup';

const errorMessages =
  i18n[LocaleStore.currentLocale].interestAssets.addModel.errors;

export const validateSchema = Yup.object().shape({
  categoryName: Yup.string().required(errorMessages.requiredFiled),
});
