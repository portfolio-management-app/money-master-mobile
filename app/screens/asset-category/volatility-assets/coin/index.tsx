import { imageSource } from 'assets/images';
import { NavigationHeader } from 'navigation/header';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { Card, Image } from 'react-native-ui-lib';
import { FloatingButton, PlatformView, TextContainer } from 'shared/components';
import { colorScheme, iconProvider, styleProvider } from 'shared/styles';

export const Coin = () => {
  const defaultAssets = [
    {
      title: 'Bitcoin',
      icon: imageSource.bitcoin,
    },
    {
      title: 'Ethereum',
      icon: imageSource.ethereum,
    },
  ];
  return (
    <PlatformView style={styleProvider.bgBody}>
      <NavigationHeader title="Coin" />
      <LinearGradient
        style={styles.header}
        colors={[colorScheme.theme, colorScheme.purple600]}
      >
        <View style={styles.headerContainer}>
          <TextContainer style={{ color: colorScheme.white }}>
            Balance
          </TextContainer>
          <TextContainer type="h1" style={{ color: colorScheme.white }}>
            $105.000
          </TextContainer>
          <TextContainer style={{ color: colorScheme.white }}>
            +$100
          </TextContainer>
        </View>
      </LinearGradient>
      <View style={styleProvider.assetCardContainer}>
        {defaultAssets.map((asset, idx) => (
          <Card style={styleProvider.assetCard} enableShadow key={idx}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image style={styleProvider.assetImage} source={asset.icon} />
              <View style={styles.textContainer}>
                <TextContainer type="h4" style={{ fontWeight: 'bold' }}>
                  {asset.title}
                </TextContainer>
                <TextContainer type="small">{asset.title}</TextContainer>
              </View>
            </View>
            <View>
              <TextContainer type="small">Market cap</TextContainer>
              <TextContainer style={{ color: colorScheme.red500 }} type="small">
                1000$
              </TextContainer>
            </View>
          </Card>
        ))}
      </View>
      <FloatingButton size={60}>
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

const styles = StyleSheet.create({
  header: {
    borderRadius: 20,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContainer: {
    padding: 30,
    justifyContent: 'space-between',
  },
  textContainer: {
    marginLeft: 10,
  },
});
