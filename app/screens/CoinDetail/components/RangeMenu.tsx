import React from 'react';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import { View } from 'react-native-ui-lib';
import { Icon, TextContainer } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { CoinDetailStore } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';

const RANGE_CONTENT = APP_CONTENT.cryptoDetail.range;

const Component = () => {
  const [range, setRange] = React.useState<string>(RANGE_CONTENT.D);
  const { getChartData, coinInfo, currency } = CoinDetailStore;
  return (
    <Menu>
      <MenuTrigger>
        <View style={styleProvider.centerHorizontal}>
          <TextContainer mr={10} type="small">
            {range}
          </TextContainer>
          <Icon.FontAwesome
            name="calendar"
            size={25}
            color={colorScheme.black200}
          />
        </View>
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: {
            borderRadius: 10,
            padding: 10,
          },
        }}
      >
        <MenuOption
          onSelect={() => {
            setRange(RANGE_CONTENT.D);
            getChartData(coinInfo.id, currency, 1);
          }}
        >
          <TextContainer>{RANGE_CONTENT.D}</TextContainer>
        </MenuOption>
        <MenuOption
          onSelect={() => {
            setRange(RANGE_CONTENT.W);
            getChartData(coinInfo.id, currency, 7);
          }}
        >
          <TextContainer>{RANGE_CONTENT.W}</TextContainer>
        </MenuOption>
        <MenuOption
          onSelect={() => {
            setRange(RANGE_CONTENT.M);
            getChartData(coinInfo.id, currency, 30);
          }}
        >
          <TextContainer>{RANGE_CONTENT.M}</TextContainer>
        </MenuOption>
        <MenuOption
          onSelect={() => {
            setRange(RANGE_CONTENT.Y);
            getChartData(coinInfo.id, currency, 365);
          }}
        >
          <TextContainer>{RANGE_CONTENT.Y}</TextContainer>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
};

export const RangeMenu = React.memo(Component);
