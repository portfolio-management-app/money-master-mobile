import { imageSource } from 'assets/images';
import {
  CreateAssetModal,
  FloatingButton,
  PlatformView,
  TextContainer,
} from 'shared/components';
import { i18n } from 'i18n';
import { Observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import React from 'react';
import { Image, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, Incubator } from 'react-native-ui-lib';
import { LocaleStore } from 'shared/stores';
import { colorScheme, iconProvider, styleProvider } from 'shared/styles';
import { useCreateNewCategory } from './hooks';
import { Validator } from 'utils/validator';

export const InterestAssets = () => {
  const [showSheet, setShowSheet] = React.useState(false);
  const {
    setAssetName,
    setCurrentAsset,
    setInterestRate,
    setInterestValue,
    setInterestType,
    setStartDate,
    submit,
    cleanUp,
  } = useCreateNewCategory();

  const toggle = () => {
    cleanUp();
    setShowSheet(!showSheet);
  };

  const onCreate = () => {
    const res = submit();
    if (res) {
      toggle();
    }
  };

  return (
    <PlatformView style={styleProvider.body}>
      <Observer>
        {() => {
          const { currentLocale } = LocaleStore;
          const modalContent = i18n[currentLocale].interestAssets.addModel;
          const defaultAssets = [
            {
              title: i18n[currentLocale].interestAssets.bank,
              icon: imageSource.bank,
            },
            {
              title: 'New asset',
              icon: imageSource.defaultAsset,
            },
            {
              title: 'New asset',
              icon: imageSource.defaultAsset,
            },
            {
              title: 'New asset',
              icon: imageSource.defaultAsset,
            },
            {
              title: 'New asset',
              icon: imageSource.defaultAsset,
            },
            {
              title: 'New asset',
              icon: imageSource.defaultAsset,
            },
            {
              title: 'New asset',
              icon: imageSource.defaultAsset,
            },
            {
              title: 'New asset',
              icon: imageSource.defaultAsset,
            },
            {
              title: 'New asset',
              icon: imageSource.defaultAsset,
            },
            {
              title: 'New asset',
              icon: imageSource.defaultAsset,
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
              <CreateAssetModal
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
                    <Incubator.TextField
                      style={styleProvider.textField}
                      containerStyle={styleProvider.textFieldContainer}
                      placeholder={modalContent.name}
                      onChangeText={setAssetName}
                      enableErrors
                      validateOnBlur
                      validationMessage={modalContent.errors.requiredFiled}
                      validate={'required'}
                    />
                    <Incubator.TextField
                      style={styleProvider.textField}
                      containerStyle={styleProvider.textFieldContainer}
                      placeholder={modalContent.asset}
                      onChangeText={setCurrentAsset}
                      enableErrors
                      validateOnBlur
                      validationMessage={modalContent.errors.mustBeANumber}
                      validate={Validator.validateNumber}
                    />
                    <Incubator.TextField
                      style={styleProvider.textField}
                      containerStyle={styleProvider.textFieldContainer}
                      placeholder={modalContent.interestRate}
                      onChangeText={setInterestRate}
                      enableErrors
                      validateOnBlur
                      validationMessage={modalContent.errors.mustBeANumber}
                      validate={Validator.validateNumber}
                    />
                    <Incubator.TextField
                      style={styleProvider.textField}
                      containerStyle={styleProvider.textFieldContainer}
                      placeholder={modalContent.interestValue}
                      onChangeText={setInterestValue}
                      enableErrors
                      validateOnBlur
                      validationMessage={modalContent.errors.mustBeANumber}
                      validate={Validator.validateNumber}
                    />
                  </>
                )}
                show={showSheet}
                onClose={toggle}
                onCreate={onCreate}
              />
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
