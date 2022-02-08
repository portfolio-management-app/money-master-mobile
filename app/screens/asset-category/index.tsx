import { useNavigation } from '@react-navigation/native';
import { imageSource } from 'assets/images';
import { FocusAwareStatusBar, PlatformView, TextContainer } from 'components';
import { i18n } from 'i18n';
import { Observer } from 'mobx-react-lite';
import { screenName } from 'navigation/screen-names';
import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Card } from 'react-native-ui-lib';
import { LocaleStore } from 'stores/ui-store';
import { colorScheme, styleProvider } from 'styles';

export const AssetCategory = () => {
  const navigation = useNavigation();

  const gotoInterestAssets = () => {
    navigation.navigate(screenName.interestAssets as never);
  };

  const gotoNonInterestAssets = () => {
    navigation.navigate(screenName.nonInterestAssets as never);
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
                colors={[
                  colorScheme.theme,
                  colorScheme.blue200,
                  colorScheme.pink700,
                ]}
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
                      Your price
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
              <View style={styles.cardContainer}>
                <Card
                  onPress={gotoInterestAssets}
                  style={styles.card}
                  enableBlur
                >
                  <Image style={styles.image} source={imageSource.tablet} />
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
                  <Image
                    style={styles.image}
                    source={imageSource.growthGraph}
                  />
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
                  onPress={gotoNonInterestAssets}
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
              </View>
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
    height: 350,
    width: '100%',
    paddingHorizontal: 30,
    justifyContent: 'flex-end',
    paddingBottom: 100,
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
    borderColor: colorScheme.gray400,
    borderWidth: 0.5,
  },
  reportBtn: {
    backgroundColor: colorScheme.purple600,
    width: 200,
    paddingVertical: 10,
    borderRadius: 20,
  },
});
