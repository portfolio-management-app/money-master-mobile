import { useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import {
  MainStackNavigationProp,
  RootStackScreenProps,
} from 'navigation/types';
import React from 'react';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-ui-lib';
import { PlatformView, TextContainer } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { PortfolioDetailStore, PortfolioListStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';

const CONTENT = APP_CONTENT.portfolioPicker;

export const PortfolioPicker = observer(() => {
  const navigation = useNavigation<MainStackNavigationProp>();
  const routeProps =
    useRoute<RootStackScreenProps<'PortfolioPicker'>['route']>();
  const { portfolioList } = PortfolioListStore;
  const handlePortfolioPress = (id: number, name: string) => {
    PortfolioDetailStore.assignInfo(id, name);
    switch (routeProps.params.type) {
      case 'CRYPTO':
        navigation.navigate('BuyCrypto');
        break;
      case 'STOCK':
        navigation.navigate('BuyStock');
        break;
      case 'CURRENCY':
        navigation.navigate('BuyCurrency');
        break;
      case 'METAL':
        if (routeProps.params.metalType === 'gold') {
          navigation.navigate('BuyGold');
        } else {
          navigation.navigate('BuySilver');
        }
    }
  };
  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader title={CONTENT.header} />
      <ScrollView>
        {portfolioList.map((portfolio) => (
          <TouchableOpacity
            onPress={() => handlePortfolioPress(portfolio.id, portfolio.name)}
            key={portfolio.id}
            style={styleProvider.card}
          >
            <TextContainer>{portfolio.name}</TextContainer>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </PlatformView>
  );
});
