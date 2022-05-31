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
  TransparentLoading,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { ICurrencyAsset } from 'shared/models';
import { CashAssetStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';
import { EditCashAssetSchema } from 'shared/validator';

interface IProps {
  open: boolean;
  item: ICurrencyAsset;
  onClose: () => void;
  onEdit: (data: any) => void;
}

const FORM_CONTENT = APP_CONTENT.portfolioDetail.createOtherModal;
const SCREEN_CONTENT = APP_CONTENT.cashAssetDetail.editModal;
export const EditModal = observer(({ open, item, onClose, onEdit }: IProps) => {
  const { editResponse } = CashAssetStore;
  return (
    <Modal visible={open} animationType="fade">
      <Formik
        validationSchema={EditCashAssetSchema}
        initialValues={{
          amount: item.amount,
          currency: item.currencyCode,
          description: item.description,
          name: item.name,
        }}
        onSubmit={(values) => {
          values.amount = 1 * values.amount;
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
                title={SCREEN_CONTENT.title}
              />
              <ScrollView style={styleProvider.container}>
                <CustomTextField
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  errorMessage={touched.name ? errors.name : ''}
                  value={values.name}
                  placeholder={SCREEN_CONTENT.name}
                />
                <CustomTextField
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  placeholder={FORM_CONTENT.description}
                  value={values.description}
                />
                <CustomTextField
                  onChangeText={handleChange('amount')}
                  onBlur={handleBlur('amount')}
                  errorMessage={touched.amount ? errors.amount : ''}
                  keyBoardType="decimal-pad"
                  placeholder={SCREEN_CONTENT.amount}
                  value={values.amount.toString()}
                />

                <CurrencyPicker
                  initVal={item.currencyCode}
                  onChange={handleChange('currency')}
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
