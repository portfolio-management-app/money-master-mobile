import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Card } from 'react-native-ui-lib';
import { Observer } from 'mobx-react-lite';
import { screenName } from 'navigation/screen-names';
import { LocaleStore } from 'shared/stores';
import { i18n } from 'i18n';
import { colorScheme, styleProvider } from 'shared/styles';
import { imageSource } from 'assets/images';
import {
  FocusAwareStatusBar,
  PlatformView,
  TextContainer,
} from 'shared/components';
import { ScrollView } from 'react-native-gesture-handler';

export const AssetCategory = () => {
  const navigation = useNavigation();

  const gotoInterestAssets = () => {
    navigation.navigate(screenName.interestAssets as never);
  };

  const gotoNonInterestAssets = () => {
    navigation.navigate(screenName.volatilityAssets as never);
  };

  const gotoRealEstateAssets = () => {
    navigation.navigate(screenName.realEstateAssets as never);
  };
  const gotoCashEstateAssets = () => {
    navigation.navigate(screenName.cashAssets as never);
  };
  return (
    <PlatformView style={styleProvider.body}>
      <FocusAwareStatusBar
        backgroundColor={colorScheme.theme}
        barStyle={'light-content'}
      />
      <Observer>
        {() => {
          const { currentLocale } = LocaleStore;
          const content = i18n[currentLocale].portfolioCategory;
          return (
            <>
              <LinearGradient
                style={styles.header}
                colors={[colorScheme.theme, colorScheme.purple600]}
              >
                <View>
                  <View style={styles.headerContainer}>
                    <TextContainer
                      style={{ color: colorScheme.white, fontWeight: 'bold' }}
                      type="h1"
                    >
                      {content.header}
                    </TextContainer>
                    <Image
                      style={styles.treasure}
                      source={imageSource.treasureChest}
                    />
                  </View>

                  <TextContainer style={{ color: colorScheme.white }}>
                    {content.headerContent}
                  </TextContainer>
                  <View style={{ marginTop: 30 }}>
                    <TextContainer style={{ color: colorScheme.white }}>
                      {content.total}
                    </TextContainer>
                    <TextContainer
                      type="h1"
                      style={{
                        color: colorScheme.white,
                        fontWeight: 'bold',
                      }}
                    >
                      $100.000
                    </TextContainer>
                  </View>
                </View>
              </LinearGradient>
              <ScrollView>
                <View style={styles.cardContainer}>
                  <Card
                    onPress={gotoInterestAssets}
                    style={styles.card}
                    enableBlur
                  >
                    <Image
                      style={styles.image}
                      source={imageSource.growthGraph}
                    />
                    <View style={{ marginLeft: 20 }}>
                      <TextContainer style={{ fontWeight: 'bold' }}>
                        {content.interest}
                      </TextContainer>
                      <TextContainer type="small">
                        {content.interest}
                      </TextContainer>
                    </View>
                  </Card>
                  <Card
                    onPress={gotoNonInterestAssets}
                    style={styles.card}
                    enableBlur
                  >
                    <Image style={styles.image} source={imageSource.barChart} />
                    <View style={{ marginLeft: 20 }}>
                      <TextContainer style={{ fontWeight: 'bold' }}>
                        {content.nonInterest}
                      </TextContainer>
                      <TextContainer type="small">
                        {content.nonInterest}
                      </TextContainer>
                    </View>
                  </Card>
                  <Card
                    onPress={gotoRealEstateAssets}
                    style={styles.card}
                    enableBlur
                  >
                    <Image style={styles.image} source={imageSource.building} />
                    <View style={{ marginLeft: 20 }}>
                      <TextContainer style={{ fontWeight: 'bold' }}>
                        {content.realProperty}
                      </TextContainer>
                      <TextContainer type="small">
                        {content.realProperty}
                      </TextContainer>
                    </View>
                  </Card>
                  <Card
                    onPress={gotoCashEstateAssets}
                    style={styles.card}
                    enableBlur
                  >
                    <Image style={styles.image} source={imageSource.cash} />
                    <View style={{ marginLeft: 20 }}>
                      <TextContainer style={{ fontWeight: 'bold' }}>
                        {content.cash}
                      </TextContainer>
                      <TextContainer type="small">{content.cash}</TextContainer>
                    </View>
                  </Card>
                </View>
              </ScrollView>
            </>
          );
        }}
      </Observer>
    </PlatformView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
  },
  header: {
    height: 300,
    width: '100%',
    paddingHorizontal: 30,
    justifyContent: 'flex-end',
    paddingBottom: 50,
  },
  treasure: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
  cardContainer: {
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 20,
  },
  reportBtn: {
    backgroundColor: colorScheme.purple600,
    width: 200,
    paddingVertical: 10,
    borderRadius: 20,
  },
});
