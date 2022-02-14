import { imageSource } from 'assets/images';
import {
  CreateAssetModal,
  FloatingButton,
  FocusAwareStatusBar,
  PlatformView,
  TextContainer,
  TextField,
} from 'shared/components';
import { i18n } from 'i18n';
import { Observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import React from 'react';
import { Image, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from 'react-native-ui-lib';
import { LocaleStore } from 'shared/stores';
import { colorScheme, iconProvider, styleProvider } from 'shared/styles';
import { Formik } from 'formik';
import { validateSchema } from './validator';

export const InterestAssets = () => {
  const [showSheet, setShowSheet] = React.useState(false);
  const [interestType, setInterestType] = React.useState('Week');
  const [startDate, setStartDate] = React.useState(new Date());

  const toggle = () => {
    reset();
    setShowSheet(!showSheet);
  };

  const reset = () => {
    setInterestType('Week');
    setStartDate(new Date());
  };

  return (
    <PlatformView style={styleProvider.body}>
      <FocusAwareStatusBar backgroundColor={colorScheme.white} />

      <Observer>
        {() => {
          const { currentLocale } = LocaleStore;
          const modalContent = i18n[currentLocale].interestAssets.addModel;
          const defaultAssets = [
            {
              title: i18n[currentLocale].interestAssets.bank,
              icon: imageSource.bank,
            },
          ];

          return (
            <>
              <NavigationHeader
                title={i18n[currentLocale].portfolioCategory.interest}
              />

              <ScrollView>
                <View style={styleProvider.assetCardContainer}>
                  {defaultAssets.map((asset, idx) => (
                    <Card
                      style={styleProvider.assetCard}
                      enableShadow
                      key={idx}
                    >
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        <Image
                          style={styleProvider.assetImage}
                          source={asset.icon}
                        />
                        <View style={styleProvider.assetTextContainer}>
                          <TextContainer
                            type="h4"
                            style={{ fontWeight: 'bold' }}
                          >
                            {asset.title}
                          </TextContainer>
                          <TextContainer type="small">
                            {asset.title}
                          </TextContainer>
                        </View>
                      </View>
                      <View style={styleProvider.assetTextContainer}>
                        <TextContainer type="small">Market cap</TextContainer>
                        <TextContainer
                          style={{ color: colorScheme.red500 }}
                          type="small"
                        >
                          1000$
                        </TextContainer>
                      </View>
                    </Card>
                  ))}
                </View>
              </ScrollView>
              <Formik
                initialValues={{
                  assetName: '',
                  currentAsset: '0',
                  interestRate: '0',
                  interestValue: '0',
                }}
                validationSchema={validateSchema}
                validateOnMount={true}
                isInitialValid={false}
                onSubmit={(values, { resetForm }) => {
                  console.log(values, interestType, startDate);
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
                            errorMessage={
                              touched.assetName ? errors.assetName : ''
                            }
                            placeholder={modalContent.name}
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
            </>
          );
        }}
      </Observer>
      <FloatingButton size={60} onPress={toggle}>
        <Icon
          tvParallaxProperties={{}}
          name="add"
          size={30}
          type={iconProvider.ionicon}
          color={colorScheme.white}
        />
      </FloatingButton>
    </PlatformView>
  );
};
