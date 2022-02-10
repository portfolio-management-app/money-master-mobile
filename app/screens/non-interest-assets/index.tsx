import React from 'react';
import { FloatingButton, PlatformView, TextContainer } from 'shared/components';
import { colorScheme, iconProvider, styleProvider } from 'shared/styles';
import { NavigationHeader } from 'navigation/header';
import { Observer } from 'mobx-react-lite';
import { LocaleStore } from 'shared/stores';
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
          const content = i18n[currentLocale].nonInterestAssets;
          const defaultAssets = [
            {
              title: content.coin,
              icon: imageSource.bitcoin,
            },
            {
              title: content.stock,
              icon: imageSource.chartLine,
            },
            {
              title: content.gold,
              icon: imageSource.gold,
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
                title={i18n[currentLocale].portfolioCategory.nonInterest}
              />
              <ScrollView>
                <View style={styles.cardContainer}>
                  {defaultAssets.map((asset, idx) => (
                    <Card style={styles.card} enableShadow key={idx}>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        <Image style={styles.image} source={asset.icon} />
                        <View style={styles.textContainer}>
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
                </View>
              </ScrollView>
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
      <AddNewAssetModal show={showSheet} onHide={toggle} />
    </PlatformView>
  );
};

export const styles = StyleSheet.create({
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
  image: {
    width: 30,
    height: 30,
  },
  cardContainer: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
});
