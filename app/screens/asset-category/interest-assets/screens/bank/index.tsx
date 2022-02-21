import { i18n } from 'i18n';
import { Observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { PlatformView } from 'shared/components';
import { LocaleStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';
import { AddNewModal } from '../components';

export const Bank = () => {
  return (
    <PlatformView style={styleProvider.bgBody}>
      <Observer>
        {() => {
          const { currentLocale } = LocaleStore;
          const content = i18n[currentLocale].interestAssets;
          return (
            <>
              <NavigationHeader title={content.bank} />
              <ScrollView></ScrollView>
              <AddNewModal />
            </>
          );
        }}
      </Observer>
    </PlatformView>
  );
};
