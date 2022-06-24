import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { ScrollView } from 'react-native';
import { Modal } from 'react-native-ui-lib';
import {
  CreateModalHeader,
  CustomTextField,
  CustomToast,
  TransparentLoading,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { IStockAsset } from 'shared/models';
import { StockAssetStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';
import { EditCryptoAssetSchema } from 'shared/validator';

interface IProps {
  open: boolean;
  item: IStockAsset;
  onClose: () => void;
  onEdit: (data: any) => void;
}

const FORM_CONTENT = APP_CONTENT.portfolioDetail.createOtherModal;
const SCREEN_CONTENT = APP_CONTENT.stockAssetDetail.editModal;

export const EditModal = observer(({ open, item, onClose, onEdit }: IProps) => {
  const { editResponse } = StockAssetStore;
  return (
    <Modal visible={open} animationType="fade">
      <Formik
        validationSchema={EditCryptoAssetSchema}
        initialValues={{
          name: item.name,
          currentAmountHolding: item.currentAmountHolding,
          description: item.description,
        }}
        onSubmit={(values) => {
          onEdit(values);
        }}
      >
        {({
          handleChange,
          handleSubmit,
          touched,
          errors,
          values,
          handleBlur,
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
                  onChangeText={handleChange('currentAmountHolding')}
                  onBlur={handleBlur('currentAmountHolding')}
                  value={values.currentAmountHolding.toString()}
                  placeholder={SCREEN_CONTENT.amount}
                />
                <CustomTextField
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  value={values.description}
                  placeholder={SCREEN_CONTENT.description}
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
