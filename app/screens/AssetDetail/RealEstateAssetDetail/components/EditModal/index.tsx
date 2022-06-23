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
import { IRealEstateAsset } from 'shared/models';
import { RealEstateAssetStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';
import { CreateRealEstateAssetSchema } from 'shared/validator';

interface IProps {
  open: boolean;
  item: IRealEstateAsset;
  onClose: () => void;
  onEdit: (data: any) => void;
}

const FORM_CONTENT = APP_CONTENT.portfolioDetail.createOtherModal;
const SCREEN_CONTENT = APP_CONTENT.realEstateAssetDetail.editModal;

export const EditModal = observer(({ open, item, onClose, onEdit }: IProps) => {
  const { editResponse } = RealEstateAssetStore;
  return (
    <Modal visible={open} animationType="fade">
      <Formik
        validationSchema={CreateRealEstateAssetSchema}
        initialValues={{
          name: item.name,
          inputDay: item.inputDay,
          inputMoneyAmount: item.inputMoneyAmount,
          inputCurrency: item.inputCurrency,
          currentPrice: item.currentPrice,
          description: item.description,
        }}
        onSubmit={(values) => {
          values.inputMoneyAmount = 1 * values.inputMoneyAmount;
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
          console.log(errors);
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
                  onChangeText={handleChange('inputMoneyAmount')}
                  onBlur={handleBlur('inputMoneyAmount')}
                  errorMessage={
                    touched.inputMoneyAmount ? errors.inputMoneyAmount : ''
                  }
                  keyBoardType="decimal-pad"
                  placeholder={SCREEN_CONTENT.buyPrice}
                  value={values.inputMoneyAmount.toString()}
                />

                <CustomTextField
                  onChangeText={handleChange('currentPrice')}
                  onBlur={handleBlur('currentPrice')}
                  errorMessage={touched.currentPrice ? errors.currentPrice : ''}
                  keyBoardType="decimal-pad"
                  placeholder={SCREEN_CONTENT.currentPrice}
                  value={values.currentPrice.toString()}
                />
                <CurrencyPicker
                  errorMessage={
                    touched.inputCurrency ? errors.inputCurrency : ''
                  }
                  initVal={item.inputCurrency}
                  onChange={handleChange('inputCurrency')}
                  renderPicker={renderPickerForPortfolio}
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
