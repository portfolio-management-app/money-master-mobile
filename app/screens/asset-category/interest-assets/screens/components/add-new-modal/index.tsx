import { Formik } from 'formik';
import { i18n } from 'i18n';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Icon } from 'react-native-elements';
import {
  CreateAssetModal,
  FloatingButton,
  TextField,
  SearchPicker,
} from 'shared/components';

import { LocaleStore } from 'shared/stores';
import { colorScheme, iconProvider } from 'shared/styles';
import { currencyValues } from './constants';
import { validateSchema } from './validator';

interface IProps {
  onSubmit: (data: any) => void;
}

export const AddNewModal = observer(({ onSubmit }: IProps) => {
  const [interestType, setInterestType] = React.useState('Week');
  const [startDate, setStartDate] = React.useState(new Date());
  const [showSheet, setShowSheet] = React.useState(false);
  const [currency, setCurrency] = React.useState(currencyValues[0]);

  const toggle = () => {
    reset();
    setShowSheet(!showSheet);
  };

  const reset = () => {
    setInterestType('Week');
    setStartDate(new Date());
  };

  const { currentLocale } = LocaleStore;

  const modalContent = i18n[currentLocale].interestAssets.addModel;
  return (
    <>
      <Formik
        initialValues={{
          assetName: '',
          description: '',
          currentAsset: '0',
          interestRate: '0',
          interestValue: '0',
        }}
        validationSchema={validateSchema}
        validateOnMount={true}
        isInitialValid={false}
        onSubmit={(values, { resetForm }) => {
          const interestVal = castInterestType(
            interestType,
            parseInt(values.interestValue)
          );
          onSubmit({ values, currency, startDate, interestVal });
          resetForm();
          toggle();
        }}
      >
        {({
          handleChange,
          handleSubmit,
          errors,
          handleBlur,
          touched,
          isValid,
          resetForm,
        }) => {
          return (
            <CreateAssetModal
              createOnHeader={true}
              disableCreate={!isValid}
              modalLabel={modalContent.header}
              confirmText={modalContent.add}
              cancelText={modalContent.cancel}
              hasDatePicker
              datePickerLabel={modalContent.startDate}
              hasRadioGroup
              radioValue={[
                modalContent.week,
                modalContent.month,
                modalContent.year,
              ]}
              radioLabel={modalContent.interestType}
              onRadioChange={setInterestType}
              onDateChange={setStartDate}
              renderInputs={() => (
                <>
                  <TextField
                    onChangeText={handleChange('assetName')}
                    onBlur={handleBlur('assetName')}
                    errorMessage={touched.assetName ? errors.assetName : ''}
                    placeholder={modalContent.name}
                  ></TextField>
                  <TextField
                    onChangeText={handleChange('description')}
                    placeholder={modalContent.description}
                  ></TextField>
                  <TextField
                    onChangeText={handleChange('currentAsset')}
                    onBlur={handleBlur('currentAsset')}
                    keyboardType="decimal-pad"
                    placeholder={modalContent.asset}
                    errorMessage={
                      touched.currentAsset ? errors.currentAsset : ''
                    }
                  ></TextField>
                  <SearchPicker
                    title="Currency"
                    onChange={(val: string) => {
                      setCurrency(val);
                    }}
                    values={currencyValues}
                  />
                  <TextField
                    onChangeText={handleChange('interestRate')}
                    onBlur={handleBlur('interestRate')}
                    keyboardType="decimal-pad"
                    placeholder={modalContent.interestRate}
                    errorMessage={
                      touched.interestRate ? errors.interestRate : ''
                    }
                  ></TextField>
                  <TextField
                    onChangeText={handleChange('interestValue')}
                    onBlur={handleBlur('interestValue')}
                    keyboardType="decimal-pad"
                    placeholder={modalContent.interestValue}
                    errorMessage={
                      touched.interestValue ? errors.interestValue : ''
                    }
                  ></TextField>
                </>
              )}
              show={showSheet}
              onClose={() => {
                resetForm();
                toggle();
              }}
              onCreate={handleSubmit}
            />
          );
        }}
      </Formik>
      <FloatingButton size={60} onPress={toggle}>
        <Icon
          tvParallaxProperties={{}}
          name="add"
          size={30}
          type={iconProvider.ionicon}
          color={colorScheme.white}
        />
      </FloatingButton>
    </>
  );
});

const castInterestType = (type: string, val: number): number => {
  switch (type) {
    case 'Week':
    case 'Tuần': {
      return val * 7;
    }
    case 'Month':
    case 'Tháng': {
      return val * 30;
    }

    case 'Year':
    case 'Năm': {
      return val * 365;
    }
    default:
      return val * 7;
  }
};
