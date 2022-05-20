import { Formik } from 'formik';
import React from 'react';
import { ScrollView } from 'react-native';
import { Modal } from 'react-native-ui-lib';
import {
  CreateModalHeader,
  CurrencyPicker,
  CustomTextField,
  DatePicker,
  ReinStateCheckBox,
  renderPickerForPortfolio,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { IBankAsset } from 'shared/models';
import { styleProvider } from 'shared/styles';
import { CreateBankAssetSchema } from 'shared/validator';

interface IProps {
  open: boolean;
  item: IBankAsset;
  onClose: () => void;
  onEdit: (data: any) => void;
}

const FORM_CONTENT = APP_CONTENT.portfolioDetail.createOtherModal;
const SCREEN_CONTENT = APP_CONTENT.portfolioDetail;

const Component = ({ open, item, onClose, onEdit }: IProps) => {
  const [reinState, setReinState] = React.useState(item.isGoingToReinState);
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
          isGoingToReinState: item.isGoingToReinState,
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
          onClose();
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
                <ReinStateCheckBox
                  reinState={reinState}
                  onToggle={() => setReinState(!reinState)}
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
    </Modal>
  );
};
export const EditModal = React.memo(Component);
