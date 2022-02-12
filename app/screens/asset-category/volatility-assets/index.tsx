import React from 'react';
import {
  CreateAssetModal,
  FloatingButton,
  PlatformView,
  TextContainer,
} from 'shared/components';
import { colorScheme, iconProvider, styleProvider } from 'shared/styles';
import { NavigationHeader } from 'navigation/header';
import { Observer } from 'mobx-react-lite';
import { LocaleStore } from 'shared/stores';
import { i18n } from 'i18n';
import { imageSource } from 'assets/images';
import { Card, Image, Incubator, View } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { screenName } from 'navigation/screen-names';
import { useNavigation } from '@react-navigation/native';

export const VolatilityAssets = () => {
  const [showSheet, setShowSheet] = React.useState(false);
  const navigation = useNavigation();

  const toggle = () => {
    setShowSheet(!showSheet);
  };

  const gotoAsset = (screenName: string) => {
    navigation.navigate(screenName as never);
  };

  return (
    <PlatformView style={styleProvider.body}>
      <Observer>
        {() => {
          const { currentLocale } = LocaleStore;
          const content = i18n[currentLocale].nonInterestAssets;
          const modalContent = content.addModel;
          const defaultAssets = [
            {
              title: content.coin,
              icon: imageSource.bitcoin,
              screenName: screenName.coin,
            },
            {
              title: content.stock,
              icon: imageSource.chartLine,
              screenName: screenName.coin,
            },
            {
              title: content.gold,
              icon: imageSource.gold,
              screenName: screenName.coin,
            },
            {
              title: 'New asset',
              icon: imageSource.defaultAsset,
              screenName: screenName.coin,
            },
            {
              title: 'New asset',
              icon: imageSource.defaultAsset,
              screenName: screenName.coin,
            },
            {
              title: 'New asset',
              icon: imageSource.defaultAsset,
              screenName: screenName.coin,
            },
            {
              title: 'New asset',
              icon: imageSource.defaultAsset,
              screenName: screenName.coin,
            },
            {
              title: 'New asset',
              icon: imageSource.defaultAsset,
              screenName: screenName.coin,
            },
            {
              title: 'New asset',
              icon: imageSource.defaultAsset,
              screenName: screenName.coin,
            },
            {
              title: 'New asset',
              icon: imageSource.defaultAsset,
              screenName: screenName.coin,
            },
            {
              title: 'New asset',
              icon: imageSource.defaultAsset,
              screenName: screenName.coin,
            },
            {
              title: 'New asset',
              icon: imageSource.defaultAsset,
              screenName: screenName.coin,
            },
          ];

          return (
            <>
              <NavigationHeader
                title={i18n[currentLocale].portfolioCategory.nonInterest}
              />
              <ScrollView>
                <View style={styleProvider.assetCardContainer}>
                  {defaultAssets.map((asset, idx) => (
                    <Card
                      onPress={() => gotoAsset(asset.screenName)}
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
                renderInputs={() => (
                  <>
                    <Incubator.TextField
                      style={styleProvider.textField}
                      placeholder={modalContent.name}
                    />
                    <Incubator.TextField
                      style={styleProvider.textField}
                      placeholder={modalContent.asset}
                    />
                  </>
                )}
                show={showSheet}
                onHide={toggle}
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
