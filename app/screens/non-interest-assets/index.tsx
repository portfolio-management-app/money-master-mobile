import React from 'react';
import { FloatingButton, PlatformView, TextContainer } from 'components';
import { colorScheme, iconProvider, styleProvider } from 'styles';
import { NavigationHeader } from 'navigation/header';
import { Observer } from 'mobx-react-lite';
import { LocaleStore } from 'stores/ui-store';
import { i18n } from 'i18n';
import { imageSource } from 'assets/images';
import { Card, Image, View } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { AddNewAssetModal } from './components';

export const NonInterestAssets = () => {
  const [showSheet, setShowSheet] = React.useState(false);

  const toggle = () => {
    setShowSheet(!showSheet);
  };

  return (
    <PlatformView style={styleProvider.body}>
      <Observer>
        {() => {
          const { currentLocale } = LocaleStore;
          const defaultAssets = [
            {
              title: i18n[currentLocale].nonInterestAssets.coin,
              icon: imageSource.bitcoin,
            },
            {
              title: i18n[currentLocale].nonInterestAssets.stock,
              icon: imageSource.chartLine,
            },
            {
              title: i18n[currentLocale].nonInterestAssets.gold,
              icon: imageSource.gold,
            },
          ];
          console.log(defaultAssets);

          return (
            <>
              <NavigationHeader
                title={i18n[currentLocale].portfolioCategory.nonInterest}
              />
              <ScrollView style={{ paddingHorizontal: 10, marginTop: 20 }}>
                {defaultAssets.map((asset) => (
                  <Card style={styles.card} enableShadow key={asset.title}>
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <Image source={asset.icon} />
                      <View style={styles.textContainer}>
                        <TextContainer type="h4" style={{ fontWeight: 'bold' }}>
                          {asset.title}
                        </TextContainer>
                        <TextContainer type="small">
                          {asset.title}
                        </TextContainer>
                      </View>
                    </View>
                    <View style={styles.textContainer}>
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
              </ScrollView>
            </>
          );
        }}
      </Observer>
      <FloatingButton onPress={toggle}>
        <Icon
          tvParallaxProperties={{}}
          name="add"
          type={iconProvider.ionicon}
          color={colorScheme.white}
        />
      </FloatingButton>
      <AddNewAssetModal show={showSheet} onHide={toggle} />
    </PlatformView>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 20,
    marginTop: 10,
    justifyContent: 'space-between',
    borderColor: colorScheme.gray400,
    borderWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    justifyContent: 'space-between',
    marginLeft: 15,
  },
});
