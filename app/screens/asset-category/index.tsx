import { useNavigation } from '@react-navigation/native';
import { imageSource } from 'assets/images';
import { FocusAwareStatusBar, PlatformView, TextContainer } from 'components';
import { i18n } from 'i18n';
import { Observer } from 'mobx-react-lite';
import { screenName } from 'navigation/screen-names';
import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Card, Image, View } from 'react-native-ui-lib';
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
          return (
            <>
              <LinearGradient
                style={styles.header}
                colors={[
                  colorScheme.theme,
                  colorScheme.blue200,
                  colorScheme.blue400,
                ]}
              >
                <View>
                  <View style={styles.headerContainer}>
                    <TextContainer
                      style={{ color: colorScheme.white, fontWeight: 'bold' }}
                      type="h1"
                    >
                      {i18n[currentLocale].portfolioCategory.header}
                    </TextContainer>
                    <Image
                      style={styles.treasure}
                      source={imageSource.treasureChest}
                    />
                  </View>

                  <TextContainer
                    style={{ color: colorScheme.white, fontWeight: 'bold' }}
                  >
                    {i18n[currentLocale].portfolioCategory.headerContent}
                  </TextContainer>
                </View>
              </LinearGradient>
              <View style={styles.cardContainer}>
                <Card
                  onPress={gotoInterestAssets}
                  style={styles.card}
                  enableBlur
                >
                  <Image source={imageSource.tablet} />
                  <TextContainer style={{ fontWeight: 'bold', marginLeft: 20 }}>
                    {i18n[currentLocale].portfolioCategory.interest}
                  </TextContainer>
                </Card>
                <Card
                  onPress={gotoNonInterestAssets}
                  style={styles.card}
                  enableBlur
                >
                  <Image source={imageSource.growthGraph} />
                  <TextContainer style={{ fontWeight: 'bold', marginLeft: 20 }}>
                    {i18n[currentLocale].portfolioCategory.nonInterest}
                  </TextContainer>
                </Card>
                <View>
                  <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <TextContainer>
                      {i18n[currentLocale].portfolioCategory.total}:
                    </TextContainer>
                    <TextContainer style={{ color: colorScheme.red500 }}>
                      10000 $
                    </TextContainer>
                  </View>

                  <Button
                    enableShadow
                    iconOnRight
                    iconSource={imageSource.carbonReport}
                    style={styles.reportBtn}
                    label={i18n[currentLocale].portfolioCategory.seeReport}
                  />
                </View>
              </View>
            </>
          );
        }}
      </Observer>
    </PlatformView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 300,
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
  },
  reportBtn: {
    backgroundColor: colorScheme.purple600,
    width: 200,
    paddingVertical: 10,
    borderRadius: 20,
  },
});
