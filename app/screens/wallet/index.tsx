import { PlatformView, TextContainer } from 'components';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { colorScheme, iconProvider, styleProvider } from 'styles';
import { parseToString } from 'utils/date';

export const Wallet = () => {
  return (
    <PlatformView style={styleProvider.body}>
      <StatusBar backgroundColor={colorScheme.bg} barStyle={'dark-content'} />
      <View style={styles.header}>
        <View>
          <TextContainer type="h1" style={{ fontWeight: 'bold' }}>
            Today
          </TextContainer>
          <TextContainer>{parseToString(new Date(), false)}</TextContainer>
        </View>

        <Icon
          size={35}
          tvParallaxProperties={{}}
          name="notifications"
          type={iconProvider.ionicon}
          color={colorScheme.theme}
        />
      </View>
    </PlatformView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
