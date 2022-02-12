import { imageSource } from 'assets/images';
import { FloatingButton, PlatformView, TextContainer } from 'shared/components';
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

export const RealEstateAssets = () => {
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
              title: 'New asset',
              icon: imageSource.defaultAsset,
            },
          ];

          return (
            <>
              <NavigationHeader
                title={i18n[currentLocale].portfolioCategory.realProperty}
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
