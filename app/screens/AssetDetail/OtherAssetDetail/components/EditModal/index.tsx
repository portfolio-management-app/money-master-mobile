import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { ScrollView } from 'react-native';
import { Modal } from 'react-native-ui-lib';
import {
  CreateModalHeader,
  CurrencyPicker,
  CustomTextField,
  CustomToast,
  DatePicker,
  renderPickerForPortfolio,
  TransparentLoading,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { ICustomAsset } from 'shared/models';
import { CustomAssetStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';
import { CreateBankAssetSchema } from 'shared/validator';

interface IProps {
  open: boolean;
  item: ICustomAsset;
  onClose: () => void;
  onEdit: (data: any) => void;
}

const FORM_CONTENT = APP_CONTENT.portfolioDetail.createOtherModal;
const SCREEN_CONTENT = APP_CONTENT.portfolioDetail;

export const EditModal = observer(({ open, item, onClose, onEdit }: IProps) => {
  const { editResponse } = CustomAssetStore;
  return (
    <Modal visible={open} animationType="fade">
      <Formik
        validationSchema={CreateBankAssetSchema}
        initialValues={{
          name: item.name,
          bankCode: '',
          inputDay: item.inputDay,
          inputCurrency: item.inputCurrency,
          inputMoneyAmount: item.inputMoneyAmount,
          description: item.description,
          interestRate: item.interestRate,
          termRange: item.termRange,
          changeInterestRateType: 'CONTINUE_WITH_RATE',
        }}
        onSubmit={(values) => {
          values.inputMoneyAmount = 1 * values.inputMoneyAmount;
          values.interestRate = 1 * values.interestRate;
          values.termRange = 1 * values.termRange;

          onEdit(values);
        }}
      >
        {({
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          values,
        }) => {
          return (
            <>
              <CreateModalHeader
                onClose={onClose}
                onCreate={handleSubmit}
                buttonLabel={FORM_CONTENT.update}
                title={APP_CONTENT.bankAssetDetail.editTitle}
              />
              <ScrollView style={styleProvider.container}>
                <CustomTextField
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  errorMessage={touched.name ? errors.name : ''}
                  value={values.name}
                  placeholder={SCREEN_CONTENT.bankingModal.name}
                />
                <CustomTextField
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  placeholder={FORM_CONTENT.description}
                  value={values.description}
                />
                <CustomTextField
                  onChangeText={handleChange('inputMoneyAmount')}
                  onBlur={handleBlur('inputMoneyAmount')}
                  errorMessage={
                    touched.inputMoneyAmount ? errors.inputMoneyAmount : ''
                  }
                  keyBoardType="decimal-pad"
                  placeholder={FORM_CONTENT.balance}
                  value={values.inputMoneyAmount.toString()}
                />
                <CurrencyPicker
                  errorMessage={
                    touched.inputCurrency ? errors.inputCurrency : ''
                  }
                  initVal={item.inputCurrency}
                  onChange={handleChange('inputCurrency')}
                  renderPicker={renderPickerForPortfolio}
                />
                <CustomTextField
                  onChangeText={handleChange('interestRate')}
                  onBlur={handleBlur('interestRate')}
                  keyBoardType="decimal-pad"
                  placeholder={FORM_CONTENT.rate}
                  value={values.interestRate.toString()}
                  errorMessage={touched.interestRate ? errors.interestRate : ''}
                />
                <CustomTextField
                  onChangeText={handleChange('termRange')}
                  onBlur={handleBlur('termRange')}
                  keyBoardType="decimal-pad"
                  placeholder={FORM_CONTENT.termRange}
                  value={values.termRange.toString()}
                  errorMessage={touched.termRange ? errors.termRange : ''}
                />

                <DatePicker
                  initDate={new Date(item.inputDay)}
                  onISOStringChange={handleChange('inputDay')}
                  label={FORM_CONTENT.startDate}
                />
              </ScrollView>
            </>
          );
        }}
      </Formik>
      <CustomToast
        show={editResponse.isError}
        variant="error"
        message={editResponse.errorMessage}
        onDismiss={editResponse.deleteError}
      />
      <CustomToast
        show={editResponse.isSuccess}
        message={APP_CONTENT.updateSuccess}
        onDismiss={editResponse.deleteSuccess}
      />
      <TransparentLoading show={editResponse.pending} />
    </Modal>
  );
});
