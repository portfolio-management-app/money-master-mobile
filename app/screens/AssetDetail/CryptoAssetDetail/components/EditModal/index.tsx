import { Formik } from 'formik';
import React from 'react';
import { ScrollView } from 'react-native';
import { Modal } from 'react-native-ui-lib';
import { CreateModalHeader, DatePicker } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { ICryptoAsset } from 'shared/models';
import { styleProvider } from 'shared/styles';
import { CreateRealEstateAssetSchema } from 'shared/validator';

interface IProps {
  open: boolean;
  item: ICryptoAsset;
  onClose: () => void;
  onEdit: (data: any) => void;
}

const FORM_CONTENT = APP_CONTENT.portfolioDetail.createOtherModal;
const SCREEN_CONTENT = APP_CONTENT.cryptoAssetDetail.editModal;

const Component = ({ open, item, onClose }: IProps) => {
  return (
    <Modal visible={open} animationType="fade">
      <Formik
        validationSchema={CreateRealEstateAssetSchema}
        initialValues={{}}
        onSubmit={(values) => {
          console.log(values);
          onClose();
        }}
      >
        {({ handleChange, handleSubmit }) => {
          return (
            <>
              <CreateModalHeader
                onClose={onClose}
                onCreate={handleSubmit}
                buttonLabel={FORM_CONTENT.update}
                title={SCREEN_CONTENT.title}
              />
              <ScrollView style={styleProvider.container}>
                {/* <CustomTextField
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
                  placeholder={FORM_CONTENT.balance}
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
                /> */}

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
    </Modal>
  );
};
export const EditModal = React.memo(Component);
