import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { MainStackNavigationProp } from 'navigation/types';
import React from 'react';
import { TouchableOpacity, View } from 'react-native-ui-lib';
import { TextContainer, TransparentLoading } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { MetalStore } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';
import { parseToString } from 'utils/date';
import { formatCurrency } from 'utils/number';
import { Filter } from './components';

const CONTENT = APP_CONTENT.marketCap;

export const MetalMarket = observer(() => {
  const navigation = useNavigation<MainStackNavigationProp>();
  const { information, getMetalData } = MetalStore;

  const { xauPrice, xagPrice, curr } = information.items[0];

  const gotoGoldScreen = () => {
    navigation.navigate('MetalDetail', { type: 'gold' });
  };

  const gotoSilverScreen = () => {
    navigation.navigate('MetalDetail', { type: 'silver' });
  };
  return (
    <View style={styleProvider.relativeView}>
      <Filter onChange={(val) => getMetalData(val)} />
      <TransparentLoading show={MetalStore.loading} />

      <TouchableOpacity onPress={gotoGoldScreen} style={styleProvider.card}>
        <View>
          <View style={[styleProvider.centerHorizontal, { paddingBottom: 10 }]}>
            <TextContainer bold>{CONTENT.gold}: </TextContainer>
            <TextContainer color={colorScheme.blue200}>
              {formatCurrency(xauPrice, curr)}/spot
            </TextContainer>
          </View>
          <View style={styleProvider.centerHorizontal}>
            <TextContainer bold>{CONTENT.lastUpdate}: </TextContainer>
            <TextContainer>
              {parseToString(new Date(information.ts))}
            </TextContainer>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={gotoSilverScreen} style={styleProvider.card}>
        <View>
          <View style={[styleProvider.centerHorizontal, { paddingBottom: 10 }]}>
            <TextContainer bold>{CONTENT.silver}: </TextContainer>
            <TextContainer color={colorScheme.blue200}>
              {formatCurrency(xagPrice, curr)}/spot
            </TextContainer>
          </View>
          <View style={styleProvider.centerHorizontal}>
            <TextContainer bold>{CONTENT.lastUpdate}: </TextContainer>
            <TextContainer>
              {parseToString(new Date(information.ts))}
            </TextContainer>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
});
