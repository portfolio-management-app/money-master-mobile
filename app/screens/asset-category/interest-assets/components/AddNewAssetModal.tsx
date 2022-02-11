import React from 'react';
import { BottomSheet } from 'react-native-elements';
import { Incubator, View } from 'react-native-ui-lib';
import {
  colorScheme,
  fontProvider,
  styleProvider,
  assetModalStyle,
} from 'shared/styles';
import { Observer } from 'mobx-react-lite';
import { LocaleStore } from 'shared/stores';
import { i18n } from 'i18n';
import { BaseButton, DatePicker, TextContainer } from 'shared/components';
import { RadioPicker } from './RadioPicker';

interface IProps {
  show: boolean;
  onHide: () => void;
}

export const AddNewAssetModal = ({ show, onHide }: IProps) => {
  return (
    <BottomSheet
      containerStyle={{ backgroundColor: colorScheme.loading }}
      isVisible={show}
    >
      <Observer>
        {() => {
          const { currentLocale } = LocaleStore;
          const content = i18n[currentLocale].interestAssets.addModel;
          return (
            <View style={assetModalStyle.modal}>
              <TextContainer style={assetModalStyle.header}>
                {content.header}
              </TextContainer>
              <Incubator.TextField
                style={styleProvider.textField}
                placeholder={content.name}
              />
              <Incubator.TextField
                style={styleProvider.textField}
                placeholder={content.asset}
              />
              <Incubator.TextField
                style={styleProvider.textField}
                placeholder={content.interestRate}
              />
              <Incubator.TextField
                style={styleProvider.textField}
                placeholder={content.interestValue}
              />
              <RadioPicker
                title={content.interestType}
                values={[content.week, content.month, content.year]}
              />
              <DatePicker label={content.startDate} />
              <View style={assetModalStyle.buttonContainer}>
                <BaseButton
                  labelStyle={{ fontFamily: fontProvider.openSans }}
                  style={assetModalStyle.addNewButton}
                  onPress={onHide}
                  label={content.add}
                />
                <BaseButton
                  labelStyle={{ fontFamily: fontProvider.openSans }}
                  style={assetModalStyle.cancelButton}
                  onPress={onHide}
                  label={content.cancel}
                />
              </View>
            </View>
          );
        }}
      </Observer>
    </BottomSheet>
  );
};
