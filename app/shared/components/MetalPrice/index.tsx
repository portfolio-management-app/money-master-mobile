import { observer } from 'mobx-react-lite';
import React from 'react';
import { TouchableOpacity, View } from 'react-native-ui-lib';
import { TextContainer, TransparentLoading } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { MetalStore } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';
import { parseToString } from 'utils/date';
import { formatCurrency } from 'utils/number';

interface IProps {
  onGoldPress?: () => void;
  onSilverPress?: () => void;
}

const CONTENT = APP_CONTENT.marketCap;

export const MetalPrice = observer(({ onGoldPress, onSilverPress }: IProps) => {
  const { information, getMetalData } = MetalStore;
  const { xauPrice, xagPrice, curr, chgXag, chgXau, xauClose, xagClose } =
    information.items[0];
  React.useEffect(() => {
    getMetalData(curr);
    const interval = setInterval(() => {
      getMetalData(curr);
    }, 1000 * 60);
    return () => {
      clearInterval(interval);
    };
  }, [curr, getMetalData]);
  return (
    <View style={styleProvider.relativeView}>
      <TransparentLoading show={MetalStore.loading} />
      <TouchableOpacity onPress={onGoldPress} style={styleProvider.card}>
        <View>
          <View style={[styleProvider.centerHorizontal, { paddingBottom: 10 }]}>
            <TextContainer bold>{CONTENT.gold}: </TextContainer>
            <TextContainer color={colorScheme.blue200}>
              {formatCurrency(xauPrice, curr)}/spot
            </TextContainer>
          </View>
          <View style={[styleProvider.centerHorizontal, { paddingBottom: 10 }]}>
            <TextContainer bold>{CONTENT.lastUpdate}: </TextContainer>
            <TextContainer>
              {parseToString(new Date(information.ts))}
            </TextContainer>
          </View>
          <View style={[styleProvider.centerHorizontal, { paddingBottom: 10 }]}>
            <TextContainer bold>{CONTENT.priceChange}: </TextContainer>
            <TextContainer
              color={chgXau > 0 ? colorScheme.green300 : colorScheme.red500}
            >
              {chgXau > 0 && '+'}
              {chgXau}%
            </TextContainer>
          </View>
          <View style={styleProvider.centerHorizontal}>
            <TextContainer bold>
              {APP_CONTENT.metalDetailScreen.close}:{' '}
            </TextContainer>
            <TextContainer color={colorScheme.green300}>
              {formatCurrency(xauClose, curr)}
            </TextContainer>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onSilverPress} style={styleProvider.card}>
        <View>
          <View style={[styleProvider.centerHorizontal, { paddingBottom: 10 }]}>
            <TextContainer bold>{CONTENT.silver}: </TextContainer>
            <TextContainer color={colorScheme.blue200}>
              {formatCurrency(xagPrice, curr)}/spot
            </TextContainer>
          </View>
          <View style={[styleProvider.centerHorizontal, { paddingBottom: 10 }]}>
            <TextContainer bold>{CONTENT.lastUpdate}: </TextContainer>
            <TextContainer>
              {parseToString(new Date(information.ts))}
            </TextContainer>
          </View>
          <View style={[styleProvider.centerHorizontal, { paddingBottom: 10 }]}>
            <TextContainer bold>{CONTENT.priceChange}: </TextContainer>
            <TextContainer
              color={chgXag > 0 ? colorScheme.green300 : colorScheme.red500}
            >
              {chgXag > 0 && '+'}
              {chgXag}%
            </TextContainer>
          </View>
          <View style={styleProvider.centerHorizontal}>
            <TextContainer bold>
              {APP_CONTENT.metalDetailScreen.close}:{' '}
            </TextContainer>
            <TextContainer color={colorScheme.green300}>
              {formatCurrency(xagClose, curr)}
            </TextContainer>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
});
